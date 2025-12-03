import srec from '../assets/images/timeline/srec.png';
import psg from '../assets/images/timeline/psg.png';
import hexr from '../assets/images/timeline/hexr.png';

export interface TimelineItem {
  date: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
  placeholderText: string;
}

export const timelineData: TimelineItem[] = [
  {
    date: '2016 - 2019',
    location: 'dce, Diploma, cbe',
    imageSrc: psg,
    imageAlt: 'DCE College',
    placeholderText: 'DCE<br/>College',
  },
  {
    date: '2019 - 2024',
    location: 'cse, B.E., cbe',
    imageSrc: srec,
    imageAlt: 'Ramakrishna Engineering College',
    placeholderText: 'Ramakrishna<br/>Engineering<br/>College',
  },
  {
    date: '2024 - Now',
    location: 'ui/ux dev, Chennai',
    imageSrc: hexr,
    imageAlt: 'IHEXR Factory',
    placeholderText: 'IHEXR<br/>FACTORY',
  },
];

