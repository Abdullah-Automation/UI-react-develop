import Image from 'next/image';

import AlertRedIcon from '~/assets/svgs/alert-red.svg';
import AudioOffIcon from '~/assets/svgs/audio-off.svg';
import AudioOnIcon from '~/assets/svgs/audio-on.svg';
import AudioIcon from '~/assets/svgs/audio.svg';
import CaptionIcon from '~/assets/svgs/caption.svg';
import CheckGreenIcon from '~/assets/svgs/check-green.svg';
import CheckIcon from '~/assets/svgs/check.svg';
import ClockIcon from '~/assets/svgs/clock-icon.svg';
import DarkVideoIcon from '~/assets/svgs/dark-video-icon.svg';
import DiamondIcon from '~/assets/svgs/diamond-icon.svg';
import FileIcon from '~/assets/svgs/file-upload.svg';
import FileUploadIcon from '~/assets/svgs/file-upload-icon.svg';
import GreenCheckIcon from '~/assets/svgs/green-check.svg';
import GreenCheckCircleIcon from '~/assets/svgs/green-check-circle.svg';
import HeadphonesIcon from '~/assets/svgs/headphones.svg';
import LogoIcon from '~/assets/svgs/logo-sm.svg';
import ExportIcon from '~/assets/svgs/export.svg';
import VideoIcon from '~/assets/svgs/video.svg';
import TextIcon from '~/assets/svgs/text.svg';
import LockSegmentIcon from '~/assets/svgs/lock-segment.svg';

const IMAGES = {
  AlertRedIcon,
  AudioOffIcon,
  AudioOnIcon,
  AudioIcon,
  CaptionIcon,
  CheckIcon,
  CheckGreenIcon,
  ClockIcon,
  DarkVideoIcon,
  DiamondIcon,
  FileIcon,
  FileUploadIcon,
  GreenCheckIcon,
  GreenCheckCircleIcon,
  HeadphonesIcon,
  LogoIcon,
  ExportIcon,
  VideoIcon,
  TextIcon,
  LockSegmentIcon,
};

export type IconNames = typeof IMAGES;

interface IProps {
  name: keyof IconNames;
  width?: number;
  height?: number;
  className?: string;
}

export const SvgImage = ({
  name,
  width = 0,
  height = 0,
  className,
}: IProps) => {
  return (
    <Image
      src={IMAGES[name]}
      width={width}
      height={height}
      className={className}
      alt='SVG'
    />
  );
};
