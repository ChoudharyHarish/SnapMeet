import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import PostCard from "../../../components/Cards/PostCard";
import { useGetPostsQuery } from "../../../redux/postApiSlice";

const Main = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const { data, isLoading, isFetching } = useGetPostsQuery(
    { page, limit },
    { skip: !hasMore }
  );

  useEffect(() => {
    if (data?.posts?.length) {
      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      if (!data.nextPage) setHasMore(false);
    }
  }, [data]);

  console.log(posts);

  const fetchMoreData = () => {
    if (!isFetching && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <section className="flex flex-col items-center gap-4">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<div>Loading more posts...</div>}
        endMessage={<div>No more posts to show.</div>}
      >
        {posts.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </InfiniteScroll>
    </section>
  );
};

export default Main;
