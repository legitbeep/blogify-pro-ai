export interface Blog {
  id: string;
  title: string;
  image: string;
  tags: string[];
  createdAt: string;
  author: {
    name: string;
    image: string;
  };
}
