import { Title } from "@solidjs/meta";

import { createEffect, createResource, createSignal, Suspense, Resource, Match, Switch } from 'solid-js';

import ArticleCard from "~/components/ArticleCard";

const [articlesList, setArticlesList] = createSignal([] as Array<{title: string, body: string, pub_date: string, id: number}>);
const [currentPage, setCurrentPage] = createSignal(1);
const [totalPages, setTotalPages] = createSignal(null);

const fetchData = async (page: number) => {
  const baseUrl = 'http://127.0.0.1:8000/articles/articles/';
  const url = new URL(baseUrl);
  url.searchParams.append('page', page.toString());

  console.log("url: ", page);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const responseData = await response.json();
  // console.log(responseData); // 打印响应内容
  return responseData;
}

// 分页组件
const Pagination = (props: any) => {
  // const { currentPage, totalPages, onPageChange } = props;

  const handlePrev = async () => {
    try {
      setCurrentPage(currentPage() - 1);
      // const responseData = await fetchData(currentPage - 1);
      // setArticlesList(responseData.results);
      // setCurrentPage(currentPage - 1);
      // console.log(currentPage());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleNext = async () => {
    try {
      setCurrentPage(currentPage() + 1);
      // const responseData = await fetchData(currentPage);
      // setArticlesList(responseData.results);
      // onPageChange(currentPage + 1);
      // console.log("111", currentPage);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button disabled={currentPage() === 1} onClick={handlePrev}>Prev</button>
      <span>{currentPage()}/{totalPages()}</span>
      <button disabled={currentPage() === totalPages()} onClick={handleNext}>Next</button>
    </div>
  );
};

const MyComponent = () => {
  const [loading, setLoading] = createSignal(true);

  createEffect(async () => {
    try {
      setLoading(true);
      const fetchedData = await fetchData(currentPage());
      const ArticleList = (fetchedData as any).results;
      const TotalPages = (fetchedData as any).total_pages;
      const CurrentPage = currentPage();
      setArticlesList(ArticleList);
      setTotalPages(TotalPages);
      setCurrentPage(CurrentPage)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  });

  // 处理页码变化的逻辑
  // const handlePageChange = (page: any) => {
  //   setCurrentPage(page);
  // };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div>
        {articlesList().map(article => (
          <ArticleCard
            id={article.id}
            title={article.title}
            content={article.body}
            pub_date={article.pub_date}
            link={`http://localhost:8000/articles/${article.id}/`}
          />
        ))}
      </div>
      {totalPages && <Pagination currentPage={currentPage()} totalPages={totalPages}/>} {/* 只有在 totalPages 不为 null 时才渲染 Pagination 组件 */}
    </Suspense>
  );
};

export default function Article() {
  return (
    <main>
      <Title>Hello Article</Title>
      <h1>Hello Article!</h1>
      <MyComponent />
      <div>Welcome to GGBond's Blog!</div>
    </main>
  );
}