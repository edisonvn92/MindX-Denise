import React from 'react';
import { Typography, Button } from '@mx/ui';
import { TooltipRenderProps } from 'react-joyride';
import './index.scss';
import { useTourSteps } from '../../utils/steps';
import { useAppContext } from '@/core';

const Tooltip = (props: TooltipRenderProps) => {
  const { index, step, backProps, primaryProps, closeProps, skipProps } = props;
  const { t } = useAppContext();
  const { tours } = useTourSteps();
  return (
    <div className="tooltip-body">
      {step.title && <div className="tooltip-title">{step.title}</div>}
      <div className="tooltip-content">{step.content}</div>
      <div className={`flex w-full ${index > 0 ? 'justify-between' : 'justify-end'}`}>
        {index > 0 && (
          <Button
            {...backProps}
            type="outlined-primary"
            size="small"
            content={
              <Typography
                content={t('common:goBack')}
                fontTypo="body-sm-desktop"
                weight="semibold"
              />
            }
          />
        )}
        {index === tours.length - 1 ? (
          <Button
            {...closeProps}
            type="filled-primary"
            size="small"
            className="my-0 mr-0"
            content={
              <Typography
                content={t('common:guideDone')}
                fontTypo="body-sm-desktop"
                weight="semibold"
              />
            }
          />
        ) : (
          <div className="flex">
            <Button
              {...skipProps}
              type="filled-inverse"
              size="small"
              content={
                <Typography
                  content={t('common:skip')}
                  fontTypo="body-sm-desktop"
                  weight="semibold"
                />
              }
              className="border-none"
            />
            <Button
              {...primaryProps}
              type="filled-primary"
              size="small"
              content={
                <Typography
                  content={t('common:continue')}
                  fontTypo="body-sm-desktop"
                  weight="semibold"
                />
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tooltip;
