import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import { get } from './utils/api';
import { Card, Button } from '@mui/material';
import { timeDiff } from './utils/util.tsx';
import Like from './assets/like.png';
import LikeOn from './assets/likeOn.png';
import LikeOff from './assets/likeOff.png';
import Comment from './assets/comment.png';
import './App.css';

interface feedItem {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  shopName: string;
  shopId: string;
  images: string[];
  comments: number;
  date: string;
  text: string;
  likes: number;
  didLike: boolean;
  premium: boolean;
}
function App() {
  const [feedItems, setFeedItems] = useState<feedItem[] | undefined>();
  const page = useRef<number>(0);
  const [hasMore, setHasMore] = useState<boolean | undefined>(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    get(0).then((feed) => {
      setFeedItems(feed?.data);
      setHasMore(feed?.hasMore);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight &&
      !loading &&
      hasMore
    ) {
      setLoading(true);
      get(page.current + 1).then((feed) => {
        setTimeout(() => {
          setFeedItems(
            feedItems && feed?.data && [...feedItems, ...feed?.data]
          );
          setHasMore(feed?.hasOwnProperty('hasMore') && feed.hasMore);
          page.current += 1;
          console.log(page.current);
          setLoading(false);
        }, 500);
      });
    }
  };
  const like = (id: string) => {
    //sent like api call
    const updatedFeedItems =
      feedItems &&
      [...feedItems].map((item) => {
        if (item.id === id) {
          item.didLike = true;
          item.likes++;
          return item;
        }
        return item;
      });
    setFeedItems(updatedFeedItems);
  };
  const dislike = (id: string) => {
    //sent dislike api call
    const updatedFeedItems =
      feedItems &&
      [...feedItems].map((item) => {
        if (item.id === id) {
          item.didLike = false;
          item.likes--;
          return item;
        }
        return item;
      });
    setFeedItems(updatedFeedItems);
  };
  return (
    <>
      <Header />
      {feedItems && (
        <div className='feed'>
          {feedItems.map((item) => {
            return (
              <Card key={item.id} className='feed-card'>
                <div className='card-author'>
                  <img
                    src={item.avatar}
                    alt='avatar'
                    width='40px'
                    height='40px'
                    className='rounded'
                  />
                  <div className='feed-post-data'>
                    <div className='user-name'>{item?.username}</div>
                    <div className='shop-time'>
                      <span className='shop'>{item?.shopName}</span>
                      {item?.shopName ? ' · ' : ''}
                      {timeDiff(item.date)}
                    </div>
                  </div>
                </div>
                <div className='feed-text'>{item.text}</div>
                <div className='feed-images'>
                  {item?.images?.length === 1 ? (
                    <img
                      src={item?.images[0]}
                      height='517px'
                      width='881px'
                      className='single-picture'
                    />
                  ) : (
                    <div className='multiple-pictures'>
                      {item?.images?.map((image) => {
                        return (
                          <img
                            key={image}
                            src={image}
                            height='517px'
                            width='557px'
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className='total-like-comment'>
                  <div className='row'>
                    <span>
                      {item.likes > 0 && (
                        <img
                          className='like-pic'
                          src={Like}
                          width='18px'
                          height='18px'
                        />
                      )}
                    </span>
                    {item.likes > 0 && (
                      <span className='like-comment'>
                        {item.likes === 1 ? '1 Like' : `${item.likes} Likes`}
                      </span>
                    )}
                  </div>
                  <div className='like-comment comment'>
                    {item.comments === 0
                      ? ''
                      : item.comments === 1
                      ? '1 comment'
                      : `${item.comments} comments`}
                  </div>
                </div>
                <div className='buttonsContainer'>
                  <div className='buttons'>
                    <Button
                      sx={{
                        textTransform: 'none',
                        height: '40px',
                        width: '101px',
                        margin: '0 auto',
                        display: 'block',
                      }}
                      onClick={() =>
                        item.didLike ? dislike(item.id) : like(item.id)
                      }
                    >
                      {
                        <img
                          height={18}
                          width={18}
                          src={item.didLike ? LikeOn : LikeOff}
                        />
                      }
                      <span className={`button-txt ${item.didLike && 'liked'}`}>
                        Like
                      </span>
                    </Button>{' '}
                  </div>
                  <div className='buttons'>
                    <Button
                      sx={{
                        textTransform: 'none',
                        height: '40px',
                        width: '141px',
                        margin: '0 auto',
                        display: 'block',
                      }}
                    >
                      <img
                        style={{ verticalAlign: 'middle' }}
                        height={24}
                        width={18}
                        src={Comment}
                      />
                      <span className='button-txt'>Comment</span>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
