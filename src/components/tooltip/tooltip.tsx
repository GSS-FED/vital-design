import * as RadixTooltip from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';
import { colors } from '../../constants';

const settings = {
  delay: 500,
  offset: 8,
};

export type TooltipProps = {
  /**
   * &nbsp;
   */
  children: ReactNode;
  content: ReactNode;
};

export default function Tooltip(props: TooltipProps) {
  const { children, content } = props;

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={settings.delay}>
        <RadixTooltip.Trigger asChild>
          <TriggerWrapper tabIndex={0}>{children}</TriggerWrapper>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <Content sideOffset={settings.offset}>
            {content}
            <Arrow />
          </Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
Tooltip.displayName = 'Tooltip';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const TriggerWrapper = styled.div`
  width: fit-content;
`;
const Content = styled(RadixTooltip.Content)`
  font-size: 14px;
  max-width: 400px;
  padding: 6px 12px;
  background-color: ${colors.backgroundDark};
  border-radius: 4px;
  color: ${colors.white};
  animation: ${fadeIn} 400ms;
`;
const Arrow = styled(RadixTooltip.Arrow)`
  fill: ${colors.backgroundDark};
`;
