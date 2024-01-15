import React, { useEffect, useRef, useState } from 'react';
import { Button, Typography } from '@mx/ui';
import { GetIcon } from '../Icons/Icons';
import { useAppContext } from '@/core';
import { ContentSizeEnum } from '@/core/context/AppContext';
import { useResponsive } from '@/core/hooks/useResponsive';

export type CarouselProps = {
  slides: React.ReactNode[];
  contentSize: ContentSizeEnum;
  currentSlide?: number;
  onCurrentChange?(index: number): void;
  isResizing?: boolean;
};

export const CoreCarousel: React.FC<CarouselProps> = (props: CarouselProps) => {
  const { slides, contentSize, currentSlide, onCurrentChange, isResizing } = props;
  const { t } = useAppContext();
  const { buttonActionWithSlideMatches, fontBodyMatches, iconSizeMatches } = useResponsive();
  const screenRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [slideWidth, setSlideWidth] = useState<number>(0);

  const previousSlide = () => {
    if (current !== 0) setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current !== slides.length - 1) {
      setCurrent(current + 1);
    }
  };

  const addEventPressArrow = (ev: KeyboardEvent) => {
    if (ev.key === 'ArrowRight') nextSlide();
    if (ev.key === 'ArrowLeft') previousSlide();
  };

  useEffect(() => {
    if (currentSlide !== undefined) setCurrent(currentSlide);
  }, [currentSlide]);

  useEffect(() => {
    if (onCurrentChange) onCurrentChange(current);
    window.addEventListener('keyup', addEventPressArrow);
    return () => window.removeEventListener('keyup', addEventPressArrow);
  }, [current]);

  useEffect(() => {
    if (!screenRef.current) return () => {};
    const resizeObserver = new ResizeObserver(() => {
      setSlideWidth((screenRef.current as any).offsetWidth);
    });
    resizeObserver.observe(screenRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="overflow-hidden relative h-full" ref={screenRef}>
      <Button
        type="filled-secondary"
        size={buttonActionWithSlideMatches(contentSize)}
        content={
          <Typography
            content={t('common:goBack')}
            fontTypo={fontBodyMatches(contentSize)}
            weight="semibold"
          />
        }
        leftIcon={<GetIcon icon="IoChevronBackOutline" className={iconSizeMatches(contentSize)} />}
        className="absolute bottom-[10%] left-[5%] z-5"
        disabled={current === 0}
        onClick={previousSlide}
      />
      <Button
        type="filled-secondary"
        size={buttonActionWithSlideMatches(contentSize)}
        content={
          <Typography
            content={t('common:continue')}
            fontTypo={fontBodyMatches(contentSize)}
            weight="semibold"
          />
        }
        rightIcon={
          <GetIcon icon="IoChevronForwardOutline" className={iconSizeMatches(contentSize)} />
        }
        className="absolute bottom-[10%] right-[5%] z-5"
        disabled={current === slides.length - 1}
        onClick={nextSlide}
      />

      <div className="absolute bottom-0 flex justify-center gap-2 w-full bg-mx-gray-200 z-5">
        {slides.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={`indicator${i}`}
              className={`grow h-4 cursor-pointer  ${
                i === current ? 'bg-mx-red-600 w-6' : 'bg-mx-gray-400'
              }`}
            />
          );
        })}
      </div>
      <div
        className="flex transition ease-in-out h-full"
        style={{
          transform: `translateX(-${current * slideWidth}px)`,
          width: slideWidth * slides.length,
          transition: isResizing ? '' : `transform 1s`,
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} style={{ width: slideWidth }}>
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
};
