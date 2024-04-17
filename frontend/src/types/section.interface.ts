export interface INewsCard {
  id: string | number;
  img: string;
  text: string;
  link: {
    url: string;
    title: string;
  }
}