import { Button, List, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImageCard from '../../components/card/imageCard';
import universityApi from '../../api/universityApi';

// const data = [
//   {
//     name: 'đại học cần thơ',
//     image: 'dhct.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'đại học y dược cần thơ',
//     image: 'dhyct.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'ÐH Kỹ thuật – Công nghệ Cần Thơ',
//     image: 'dhktcnct.png',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'đại học đồng tháp',
//     image: 'dhdt.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'đại học kiên giang',
//     image: 'dhkg.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'đại học cần thơ',
//     image: 'dhct.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'đại học y dược cần thơ',
//     image: 'dhyct.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'ÐH Kỹ thuật – Công nghệ Cần Thơ',
//     image: 'dhktcnct.png',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'đại học đồng tháp',
//     image: 'dhdt.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'đại học kiên giang',
//     image: 'dhkg.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'đại học cần thơ',
//     image: 'dhct.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'đại học y dược cần thơ',
//     image: 'dhyct.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'ÐH Kỹ thuật – Công nghệ Cần Thơ',
//     image: 'dhktcnct.png',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'đại học đồng tháp',
//     image: 'dhdt.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'đại học kiên giang',
//     image: 'dhkg.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'đại học cần thơ',
//     image: 'dhct.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'đại học y dược cần thơ',
//     image: 'dhyct.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'ÐH Kỹ thuật – Công nghệ Cần Thơ',
//     image: 'dhktcnct.png',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'đại học đồng tháp',
//     image: 'dhdt.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'đại học kiên giang',
//     image: 'dhkg.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'đại học cần thơ',
//     image: 'dhct.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'đại học y dược cần thơ',
//     image: 'dhyct.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'ÐH Kỹ thuật – Công nghệ Cần Thơ',
//     image: 'dhktcnct.png',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'đại học đồng tháp',
//     image: 'dhdt.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
//   {
//     name: 'đại học kiên giang',
//     image: 'dhkg.jpg',
//     description:
//       'Eu qui consequat do reprehenderit enim est consequat in id velit. Adipisicing do incididunt ad culpa adipisicing minim adipisicing tempor labore. Deserunt fugiat sint cillum ut in consequat. Proident dolore esse ea laboris cupidatat veniam ipsum laborum mollit proident commodo cillum. Occaecat do ullamco deserunt incididunt ullamco non. Non et amet nostrud irure. Minim proident qui nisi ea enim magna et ea Lorem elit fugiat.Laborum est ad commodo id est officia eu Lorem. Lorem sint nisi nostrud proident ea sint ut anim non eiusmod aute enim officia cupidatat. Pariatur quis in mollit dolore aliqua proident consequat sint enim laborum. Magna minim anim non adipisicing cillum id. Ullamco enim ipsum non velit qui adipisicing velit officia amet. Qui exercitation amet cupidatat elit adipisicing consequat. Ad commodo adipisicing quis dolor sunt minim amet.',
//   },
// ];

function Universities() {
  const [open, setOpen] = useState(false);
  const [cardSelected, setCardSelected] = useState(0);
  const [universityData, setUniversityData] = useState([]);
  const [isLoad, setIsLoad] = useState(false);


  useEffect(() => {
    const getAllUniversityReq = async () => {
      const result = await universityApi.getAllUniversity(1, 15);
      setUniversityData(result.data.data.data);
      setIsLoad(true);
    };

    getAllUniversityReq();
  }, []);

  useEffect(() => {
    console.log('universityData', universityData);
  }, [universityData]);

  return (
    <div className="container">
      <Title>
        <h2>các trường đại học ĐBSCL</h2>
        <div className="underline"></div>
      </Title>
      {isLoad && (
        <UniversityContent>
          <List
            grid={{ column: 3 }} //The grid type of list. You can set grid to something like {gutter: 16, column: 4}
            dataSource={universityData} //DataSource array for list
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 9,
            }}
            //render content
            renderItem={(val, idx) => (
              <div
                onClick={() => {
                  setCardSelected(idx);
                  setOpen(true);
                }}
              >
                <ImageCard key={idx} title={val.name} src={`${val.UniversityDetail.image}`} />
              </div>
            )}
          ></List>
          <Modal
            className="universities-modal"
            title={universityData[cardSelected].name}
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                style={{ width: '80%', objectFit: 'cover' }}
                src={`${universityData[cardSelected].UniversityDetail.image}`}
                alt=""
              />
            </div>
            <p style={{ marginTop: '3%' }}>
              {universityData[cardSelected].UniversityDetail.description} <Button type='link' ><a href={universityData[cardSelected].UniversityDetail.url} target='_blank'>Xem thêm</a></Button>
            </p>
            
          </Modal>
        </UniversityContent>
      )}
    </div>
  );
}
const Title = styled.div`
  margin-top: 60px;
  h2 {
    text-transform: uppercase;
    border-left: 10px solid var(--primary-color);
    margin-bottom: 10px;
    padding-left: 10px;
    font-size: 3rem;
    font-weight: 800;
  }
  .underline {
    border-bottom: 4px solid var(--primary-color);
  }
`;

const UniversityContent = styled.div`
  margin-top: 3%;
`;
export default Universities;
