export interface Applicant {
  id: number;
  name: string;
  channel: string;
  followers: string;
  posts: number;
  comment: string;
  status: 'pending' | 'selected' | 'rejected';
}

export const applicants: Applicant[] = [
  {
    id: 1,
    name: '인플루언서1',
    channel: '인스타그램',
    followers: '10.5k',
    posts: 120,
    comment: '꼼꼼하게 리뷰하겠습니다!',
    status: 'pending',
  },
  {
    id: 2,
    name: '인플루언서2',
    channel: '블로그',
    followers: '5.2k',
    posts: 88,
    comment: '사진 예쁘게 찍어서 올릴게요.',
    status: 'pending',
  },
  {
    id: 3,
    name: '인플루언서3',
    channel: '유튜브',
    followers: '22.1k',
    posts: 45,
    comment: '영상으로 생생하게 전달하겠습니다.',
    status: 'selected',
  },
];
