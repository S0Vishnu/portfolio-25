import srec from '../assets/images/timeline/srec.png';
import psg from '../assets/images/timeline/psg.png';
import hexr from '../assets/images/timeline/hexr.png';

export interface TimelineItem {
  date: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
}

export const timelineData: TimelineItem[] = [
  {
    date: '2016 - 2019',
    location: 'dce, Diploma, cbe',
    imageSrc: psg,
    imageAlt: 'PSG College of Technology',
  },
  {
    date: '2019 - 2022',
    location: 'cse, B.E., cbe',
    imageSrc: srec,
    imageAlt: 'Sri Ramakrishna Engineering College',
  },
  {
    date: '2022 - Now',
    location: 'ui/ux dev, Chennai',
    imageSrc: hexr,
    imageAlt: 'HEXR Factory',
  },
];

