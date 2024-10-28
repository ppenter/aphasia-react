import React, {
  PropsWithChildren,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import { voicesState, voiceState } from "../states/tts";
import { TextToSpeech } from "@capacitor-community/text-to-speech";
import { toast } from "react-toastify";
import { cn } from "../libs/utils";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { favoriteState } from "../states/fav";

export interface ICarouselListView extends PropsWithChildren {
  list?: any[];
  title: string;
}

const CarouselListView: React.FC<ICarouselListView> = ({
  children,
  list = [],
  title,
}) => {
  const { t, i18n } = useTranslation(["speech"]);
  const [favorites, setFavorites] = useRecoilState(favoriteState);
  const [voices, setVoices] = useRecoilState(voicesState);
  const [voice, setVoice] = useRecoilState(voiceState);
  const [groupList, setGroupList] = useState<any>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    setGroupList(
      list?.reduce((acc: any, item: any) => {
        if (!acc[item?.group]) {
          acc[item?.group] = [];
        }
        acc[item?.group].push(item);
        return acc;
      }, {})
    );
  }, [list]);

  const loadVoices = useCallback(async () => {
    const { voices } = await TextToSpeech.getSupportedVoices();
    setVoices(voices);
    const voice = voices?.find((e) =>
      e.lang.includes(i18n?.language as string)
    );
    setVoice(voice);
  }, [i18n.language, setVoices, setVoice]);

  async function speak(txt: string) {
    try {
      await loadVoices();
      toast.success(t(txt));
      await TextToSpeech.speak({
        text: txt,
        lang: i18n?.language,
      });
    } catch (e) {
      // Handle error
    }
  }

  useEffect(() => {
    loadVoices();
  }, [i18n.language, loadVoices]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        const filtered = list?.filter((item: any) => {
          const translation = t(`${item?.id}.text`);
          return (
            translation?.toLowerCase()?.includes(search?.toLowerCase()) ||
            item?.title?.toLowerCase()?.includes(search?.toLowerCase())
          );
        });
        setGroupList(
          filtered?.reduce((acc: any, item: any) => {
            if (!acc[item?.group]) {
              acc[item?.group] = [];
            }
            acc[item?.group].push(item);
            return acc;
          }, {})
        );
      } else {
        setGroupList(
          list?.reduce((acc: any, item: any) => {
            if (!acc[item?.group]) {
              acc[item?.group] = [];
            }
            acc[item?.group].push(item);
            return acc;
          }, {})
        );
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [list, search, t]);

  const toggleFavorite = useCallback(
    (speech_id: string, pageItem: any) => {
      setFavorites((old: any) => {
        const isFav = old.find((e: any) => e?.speech === speech_id);
        if (isFav) {
          return old.filter((e: any) => e?.speech !== speech_id);
        } else {
          return [
            ...old,
            {
              title: pageItem.title,
              speech: speech_id,
              img: pageItem.img,
              id: pageItem?.id,
            },
          ];
        }
      });
    },
    [setFavorites]
  );

  const CarouselGroup = React.memo(
    ({ group, items }: { group: string; items: any[] }) => {
      const [currentPage, setCurrentPage] = useState(0);
      const [itemsPerPage, setItemsPerPage] = useState(4);
      const [gridCols, setGridCols] = useState(2);
      const totalPages = Math.ceil(items.length / itemsPerPage);
      const touchStartX = useRef<number | null>(null);

      useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth >= 980) {
            setItemsPerPage(8);
            setGridCols(4);
          } else if (window.innerWidth >= 560) {
            setItemsPerPage(6);
            setGridCols(3);
          } else {
            setItemsPerPage(4);
            setGridCols(2);
          }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

      const nextPage = useCallback(() => {
        if (currentPage < totalPages - 1) {
          setCurrentPage((prev) => prev + 1);
        }
      }, [currentPage, totalPages]);

      const prevPage = useCallback(() => {
        if (currentPage > 0) {
          setCurrentPage((prev) => prev - 1);
        }
      }, [currentPage]);

      const handleTouchStart = useCallback(
        (e: React.TouchEvent<HTMLDivElement>) => {
          touchStartX.current = e.touches[0].clientX;
        },
        []
      );

      const handleTouchEnd = useCallback(
        (e: React.TouchEvent<HTMLDivElement>) => {
          if (touchStartX.current === null) return;
          const touchEndX = e.changedTouches[0].clientX;
          const diff = touchStartX.current - touchEndX;

          if (Math.abs(diff) > 50) {
            // Minimum swipe distance
            if (diff > 0) {
              nextPage();
            } else {
              prevPage();
            }
          }
          touchStartX.current = null;
        },
        [nextPage, prevPage]
      );

      const carouselItems = useMemo(() => {
        return items.reduce((acc: JSX.Element[], item, index) => {
          if (index % itemsPerPage === 0) {
            acc.push(
              <div
                key={index}
                className={`grid flex-shrink-0 w-full h-full gap-4`}
                style={{
                  gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                }}
              >
                {items.slice(index, index + itemsPerPage).map((pageItem) => {
                  if (!pageItem?.title) return null;
                  const speech_id =
                    pageItem?.speech || `${title}.${pageItem?.title}.speech`;
                  const img_url =
                    pageItem?.img ||
                    `/images/items/${title}/${pageItem?.title
                      ?.toLowerCase()
                      ?.replaceAll(" ", "_")}.png`;

                  return (
                    <CarouselItem
                      key={pageItem.title}
                      pageItem={pageItem}
                      speech_id={speech_id}
                      img_url={img_url}
                      speak={speak}
                      toggleFavorite={toggleFavorite}
                      t={t}
                    />
                  );
                })}
              </div>
            );
          }
          return acc;
        }, []);
      }, [items, itemsPerPage, gridCols, title, speak, toggleFavorite, t]);

      return (
        <div className="relative w-full h-full">
          <h3 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {group !== "undefined" && t(`${title}.__group__.${group}`)}
          </h3>
          <div
            className="relative w-full h-full pb-6 overflow-hidden rounded-lg"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex h-full transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {carouselItems}
            </div>
          </div>
          {totalPages > 1 && (
            <>
              <button
                className={`absolute left-0 z-10 p-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full top-1/2 ${
                  currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={prevPage}
                disabled={currentPage === 0}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className={`absolute right-0 z-10 p-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full top-1/2 ${
                  currentPage === totalPages - 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      );
    }
  );

  const CarouselItem = React.memo(
    ({ pageItem, speech_id, img_url, speak, toggleFavorite, t }: any) => {
      const favorites = useRecoilValue(favoriteState);
      const isFav = favorites.find((e: any) => e?.speech === speech_id);

      return (
        <div
          className="relative flex h-full overflow-hidden rounded-lg max-h-[40vh]"
          onClick={async () => {
            await speak(t(speech_id));
          }}
        >
          <img
            src={img_url}
            alt={pageItem.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 flex flex-col items-center justify-center w-full p-2 bg-black bg-opacity-50 h-fit">
            <h5
              className={cn(
                "text-xl font-bold tracking-tight text-white break-words text-center"
              )}
            >
              {pageItem?.custom ? pageItem?.title : t(`${pageItem?.id}.text`)}
            </h5>
            <Heart
              className={`w-6 h-6 mt-2 cursor-pointer ${
                isFav ? "text-red-500 fill-current" : "text-white"
              }`}
              onClick={(e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                toggleFavorite(speech_id, pageItem);
              }}
            />
          </div>
        </div>
      );
    }
  );

  useEffect(() => {
    // debounce search
    const timer = setTimeout(() => {
      if (search) {
        // filter list
        const filtered = list?.filter((item: any) => {
          const translation = t(`${item?.id}.text`);
          return (
            translation?.toLowerCase()?.includes(search?.toLowerCase()) ||
            item?.title?.toLowerCase()?.includes(search?.toLowerCase())
          );
        });
        setGroupList(
          filtered?.reduce((acc: any, item: any) => {
            if (!acc[item?.group]) {
              acc[item?.group] = [];
            }
            acc[item?.group].push(item);
            return acc;
          }, {})
        );
      } else {
        setGroupList(
          list?.reduce((acc: any, item: any) => {
            if (!acc[item?.group]) {
              acc[item?.group] = [];
            }
            acc[item?.group].push(item);
            return acc;
          }, {})
        );
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="flex flex-col h-screen bg-[#e3d994]">
      <div className="flex-shrink-0 p-4 pt-6 pb-0">
        <input
          type="text"
          className="w-full p-2 border-2 border-dashed rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className="flex-grow overflow-y-auto">
        <div
          className="p-4 pt-0 space-y-8"
          style={{
            height: `calc(100% - 8rem)`,
          }}
        >
          {groupList &&
            Object.entries(groupList).map(([group, items]) => (
              <CarouselGroup key={group} group={group} items={items as any[]} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselListView;
