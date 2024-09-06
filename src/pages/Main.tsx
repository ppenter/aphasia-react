import { PropsWithChildren, useEffect, useRef } from "react";
import { mainMenu } from "../configs/site";
import { CardButton } from "../components/card-button";

export const MainPage: React.FC<PropsWithChildren> = () => {
  const gridRef = useRef(null);

  const applyColSpanToLastItem = () => {
    const gridContainer = gridRef.current as any
    const gridItems = gridContainer?.children;
    const columns = getComputedStyle(gridContainer).gridTemplateColumns.split(' ').length;

    // Reset last item's col-span class
    const lastItem = gridItems[gridItems.length - 1];
    lastItem.classList.remove('col-span-1', 'col-span-2', 'col-span-3');

    // Calculate if the last row has fewer items and apply col-span
    const itemsInLastRow = gridItems.length % columns;
    if (itemsInLastRow !== 0) {
      lastItem.classList.add(`col-span-${columns}`);
    }
  };

  useEffect(() => {
    // Apply col-span when the component mounts
    applyColSpanToLastItem();

    // Reapply on window resize to ensure the grid stays responsive
    const handleResize = () => {
      applyColSpanToLastItem();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="flex flex-col h-full">
      <div className="grid h-full grid-cols-3" ref={gridRef}>
        {mainMenu?.map((item, index) => {
          return (
            <CardButton
              to={item.href}
              title={item.title}
              img={item.img}
              key={index}
              titleClass="text-2xl"
              indexColor={index}
            />
          );
        })}
      </div>
    </div>
  );
};
