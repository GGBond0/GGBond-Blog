import { css } from "solid-styled";
import { Component, createSignal } from "solid-js";

interface ArticleCardProps {
  id: number;
  title: string;
  content: string;
  pub_date: string;
  link: string; // 添加一个链接属性
}

const ArticleCard: Component<ArticleCardProps> = (props) => {
  css`
  .card-link {
    text-decoration: none; /* 移除下划线 */
    color: inherit; /* 继承父元素的文字颜色 */
    display: block; /* 设置为块级元素 */
    width: 50%; /* 设置宽度为页面宽度的50% */
    position: sticky; /* 绝对定位 */
    left: 15%; /* 距离页面左边为页面宽度的25% */
  }
  
  .card-link:visited {
    color: inherit; /* 在点击后不改变颜色 */
  }

  .article-card-container {
    position: relative;
    width: 50%; /* fit-content */
    margin: 20px auto;
    padding: 20px;
    border-radius: 10px;
    /* background: url('background-image.jpg') no-repeat center center/cover; */
    /* background-color: rgba(138, 43, 226, 0.5); */ /* 紫色 */
  }
  
  .article-card {
    background-color: rgba(138, 43, 226, 0.5);
    width: 100%; /* fit-content */
    /* padding: 20px; */  
    border-radius: 10px;
    backdrop-filter: blur(10px);
  }

  .card h2 {
    overflow: hidden;
    text-overflow: ellipsis; /* 超出部分显示省略号 */
    white-space: nowrap; /* 不换行 */
  }
  
  .card p {
    max-width: 90%; /* 限制最大宽度为浏览器宽度的 90% */
    overflow: hidden;
    text-overflow: ellipsis; /* 超出部分显示省略号 */
    white-space: nowrap; /* 不换行 */
  }

  `
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <a href={props.link} class="card-link"> {/* 添加 href 属性 */}
      <div class="article-card">
        <h2>{props.title}</h2>
        <p>{props.content}</p>
        <p>Created at: {props.pub_date}</p>
      </div>
    </a>
  );
};

export default ArticleCard;

