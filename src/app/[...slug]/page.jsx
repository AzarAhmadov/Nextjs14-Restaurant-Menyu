'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { GraphQLClient, gql } from 'graphql-request';
import { motion, AnimatePresence } from 'framer-motion';

const graphcms = new GraphQLClient('https://api-us-west-2.hygraph.com/v2/cliw4abwt0pza01uh0kc9913j/master')

const QUERY = gql`
  {
    category {
      createdAt
      id
      name
      slug
      publishedAt
      updatedAt
      categoryImage {
        id
        url
      }
      lists {
        price
        name
        id
        image {
          url
        }
      }
    }
  }
`

const getData = async () => {
  try {
    const { category } = await graphcms.request(QUERY);
    return category;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

const CategoryDetailPage = async ({ slug, params }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const detail = await getData(slug);

  const detailfilter = detail.find((item) => item.slug === params.slug[1]);

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <main>
      <section id='detail'>
        <div className="title title-detail">
          <h3>{detailfilter.name}</h3>
        </div>
        <div className="container">
          <Link href='/'>
            <div className="back">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
            </div>
          </Link>
          <div className="row">
            {detailfilter.lists.length > 0 ? (
              detailfilter.lists.map((el, idx) => (
                <div className="detail-item" key={el.id} onClick={() => openModal(el)}>
                  <img src={el.image?.url} alt="List Image" />
                  <div className="detail">
                    <div className="price">{el.price} ₼</div>
                    <p>{el.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className='none'> <h3> Menyu seçimləri əlavə edilməyib ! </h3> </div>
            )}

          </div>
        </div>
      </section>
      <AnimatePresence>
        {selectedItem && (
          <motion.section
            id="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container">
              <div className="img">
                <img
                  src={selectedItem ? selectedItem.image.url : ''}
                  alt=""
                />
                <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                  <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                </svg>
              </div>
              <ul>
                <li>{selectedItem ? selectedItem.name : ''}</li>
                <li>{selectedItem ? selectedItem.price : ''} ₼</li>
              </ul>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  )
}

export default CategoryDetailPage