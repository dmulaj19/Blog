import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { mainAxios } from '../../../mainAxios';

export default function FeaturedInfo() {
  const [blogs, setBlogs] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {

    mainAxios.get('/blogs')
      .then(res => {
        if (res?.status === 200) {
          setBlogs([...res?.data])
        }
      })
  }, []);

  useEffect(() => {

    mainAxios.get('/posts')
      .then(res => {
        if (res?.status === 200) {
          setPosts([...res?.data])
        }
      })
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Blogs</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{blogs?.length}</span>
          {/* <span className="featuredMoneyRate">
            +35<ArrowUpward className="featuredIcon negative" />
          </span> */}
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Posts</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney"> {posts?.length}</span>
          {/* <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span> */}
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      {/* <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div> */}
    </div>
  );
}
