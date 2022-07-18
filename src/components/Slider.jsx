import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { db } from '../firebase.config';
import Spinner from './Spinner';
import 'swiper/css';
import 'swiper/css/pagination';

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      console.log(listings);
      setListings(listings);
      setLoading(false);
    };

    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return <></>;
  }

  return (
    listings && (
      <>
        <p className="exploreHeading">Recommended</p>

        <div className="swiper-container">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            style={{ width: '100%', height: '100%' }}
          >
            {listings.map(({ data, id }) => (
              <SwiperSlide key={id}>
                <div
                  style={{
                    background: `url(${data.imgUrls[0]}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                  className="swiperSlideDiv"
                >
                  <p className="swiperSlideText">{data.name}</p>
                  <p className="swiperSlidePrice">
                    ${data.discountedPrice ?? data.regularPrice} {data.type === 'rent' && '/ month'}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </>
    )
  );
}

export default Slider;
