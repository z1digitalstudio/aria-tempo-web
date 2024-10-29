import { AnimatePresence, motion } from 'framer-motion';
import { ringCardVariants } from './animation';
import type { Card as CardType } from '.';
import { ButtonIcon } from '@/components/buttonIcon';
import Image from 'next/image';
import CloseIcon from '@/assets/icons/close.svg';

export const Card = ({ cardInfo }: { cardInfo: CardType | null }) => {
  return (
    <AnimatePresence>
      {cardInfo && (
        <motion.div
          className="absolute inset-x-4 z-20"
          style={{ top: cardInfo.isScore ? '65%' : '70%' }}
          variants={ringCardVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <CardItem cardInfo={cardInfo} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const CardItem = ({
  cardInfo,
  onClose,
}: {
  cardInfo: CardType;
  onClose?: () => void;
}) => {
  const getBackgroundGradient = () => {
    switch (cardInfo.category) {
      case 'all-genre':
        return 'radial-gradient(243.85% 120.74% at 47.97% -47.5%, #40382E 0%, #000000 100%)';
      case 'cognitive':
        return 'radial-gradient(243.85% 120.74% at 47.97% -47.5%, #59312A 0%, #120806 100%)';
      case 'emotional':
        return 'radial-gradient(243.85% 120.74% at 47.97% -47.5%, #38225D 0%, #040107 100%)';
      case 'social':
        return 'radial-gradient(243.85% 120.74% at 47.97% -47.5%, #274327 0%, #091709 100%)';
    }
  };
  return (
    <div
      className="w-full md:max-w-xl max-md:h-[75svh] backdrop:bg-black/60 text-creme border border-[#a59078] p-2 open:animate-modalf"
      style={{
        background: getBackgroundGradient(),
      }}
    >
      {!!onClose && (
        <ButtonIcon
          Icon={CloseIcon}
          label="Close modal"
          autoFocus
          className="absolute top-4 right-4 z-40"
          onClick={onClose}
        >
          Close
        </ButtonIcon>
      )}
      <div className="relative border border-creme p-6 text-center size-full flex flex-col gap-6 items-center pb-12">
        {cardInfo.isScore ? (
          <>
            <p className="type-label-1">Your unique score</p>
            <p className="type-number">94.6</p>
          </>
        ) : (
          <>
            <p className="type-label-1">{cardInfo.title}</p>
            <p className="type-headline-4 mb-8">{cardInfo.description}</p>
          </>
        )}
        <Image width={200} height={200} src={cardInfo?.src} alt="" />
      </div>
    </div>
  );
};
