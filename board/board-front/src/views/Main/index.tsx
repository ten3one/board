import {
  getLatestBoardListRequest,
  getPopularListRequest,
  getTop3BoardListRequest,
} from "apis";
import { ResponseDto } from "apis/response";
import {
  GetLatestBoardListResponseDto,
  GetTop3BoardListResponseDto,
} from "apis/response/board";
import BoardItem from "components/BoardItem";
import Pagination from "components/Pagination";
import Top3Item from "components/Top3Item";
import { SEARCH_PATH } from "constant";
import { usePagination } from "hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoardListItem } from "types/interface";
import "./style.css";
import { GetPopularListResponseDto } from "apis/response/search";

//          component: 메인 화면 컴포넌트          //
export default function Main() {
  //          function: 네비게이터          //
  const navigate = useNavigate();

  //          component: 메인 화면 상단 컴포넌트          //
  const MainTop = () => {
    //          state: 주간 top3 게시물 리스트 상태          //
    const [top3BoardList, setTop3BoardList] = useState<BoardListItem[]>([]);

    //          function: get Top 3 Board List Response 처리 함수          //
    const getTop3BoardListResponse = (
      responseBody: GetTop3BoardListResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code !== "SU") return;

      const { top3List } = responseBody as GetTop3BoardListResponseDto;
      setTop3BoardList(top3List);
    };

    //          effect: 첫 마운트 시 실행될 함수          //
    useEffect(() => {
      getTop3BoardListRequest().then(getTop3BoardListResponse);
    }, []);

    //          render: 메인 화면 상단 컴포넌트 렌더링         //
    return (
      <>
        <div id="main-top-wrapper">
          <div className="main-top-container">
            <div className="main-top-title">
              {"Become Board에 \n 오신 여러분들을 환영합니다."}
            </div>
            <div className="main-top-content-box">
              <div className="main-top-content-title">{`주간 탑 3 게시글`}</div>
              <div className="main-top-content">
                {top3BoardList.map((top3ListItem) => (
                  <Top3Item top3ListItem={top3ListItem} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  //          component: 메인 화면 하단 컴포넌트          //
  const MainBottom = () => {
    //          state: 페이지 네이션 관련 상태          //
    const {
      currentPage,
      currentSection,
      viewList,
      viewPageList,
      totalSection,
      setCurrentPage,
      setCurrentSection,
      setTotalList,
    } = usePagination<BoardListItem>(5);

    //          state: 인기 검색어 리스트 상태          //
    const [popularWordList, setPopularWordList] = useState<string[]>([]);

    //          function: get Latest Board List Response 처리 함수          //
    const getLatestBoardListResponse = (
      responseBody: GetLatestBoardListResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code !== "SU") return;

      const { latestList } = responseBody as GetLatestBoardListResponseDto;
      setTotalList(latestList);
    };

    //          function: get Popular List Response 처리 함수          //
    const getPopularListResponse = (
      responseBody: GetPopularListResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code !== "SU") return;

      const { popularWordList } = responseBody as GetPopularListResponseDto;
      setPopularWordList(popularWordList);
    };

    //          event handler: 인기 검색어 클릭 이벤트 처리          //
    const onPopularWordClickHandler = (word: string) => {
      navigate(SEARCH_PATH(word));
    };

    //          effect: 첫 마운트 시 실행될 함수          //
    useEffect(() => {
      getLatestBoardListRequest().then(getLatestBoardListResponse);
      getPopularListRequest().then(getPopularListResponse);
    }, []);

    //          render: 메인 화면 하단 컴포넌트 렌더링         //
    return (
      <>
        <div id="main-bottom-wrapper">
          <div className="main-bottom-container">
            <div className="main-bottom-title">{`최신 게시물`}</div>
            <div className="main-bottom-content-box">
              <div className="main-bottom-current-content">
                {viewList.map((item) => (
                  <BoardItem boardListItem={item} />
                ))}
              </div>
              <div className="main-bottom-popular-box">
                <div className="main-bottom-popular-card">
                  <div className="main-bottom-popular-card-container">
                    <div className="main-bottom-popular-card-title">{`인기 검색어`}</div>
                    <div className="main-bottom-popular-card-content">
                      {popularWordList.map((word) => (
                        <div
                          className="word-badge"
                          onClick={() => onPopularWordClickHandler(word)}
                        >
                          {word}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-bottom-pagination-box">
              {
                <Pagination
                  currentPage={currentPage}
                  currentSection={currentSection}
                  setCurrentPage={setCurrentPage}
                  setCurrentSection={setCurrentSection}
                  viewPageList={viewPageList}
                  totalSection={totalSection}
                />
              }
            </div>
          </div>
        </div>
      </>
    );
  };

  //          render: 메인 화면 컴포넌트 렌더링         //
  return (
    <>
      <MainTop />
      <MainBottom />
    </>
  );
}
