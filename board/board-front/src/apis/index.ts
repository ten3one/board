import axios from "axios";
import { SignInRequsetDto, SignUpRequestDto } from "./request/auth";
import {
  PostBoardRequestDto,
  PostCommentRequestDto,
  UpdateBoardRequestDto,
} from "./request/board";
import { ResponseDto } from "./response";
import { SignInResponseDto, SignUpResponseDto } from "./response/auth";
import {
  DeleteBoardResponseDto,
  GetBoardResponseDto,
  GetCommentListResponseDto,
  GetFavoriteListResponseDto,
  GetLatestBoardListResponseDto,
  GetSearchBoardListResponseDto,
  GetTop3BoardListResponseDto,
  GetUserBoardListResponseDto,
  IncreaseViewCountResponseDto,
  PostBoardResponseDto,
  PostCommentResponseDto,
  PutFavoriteResponseDto,
  UpdateBoardResponseDto,
} from "./response/board";
import {
  GetPopularListResponseDto,
  GetRelationListResponseDto,
} from "./response/search";
import {
  GetSignInUserResponseDto,
  GetUserResponseDto,
  UpdateNicknameResponseDto,
  UpdateProfileImageResponseDto,
  UpdateUserInfoResponseDto,
} from "./response/user";
import {
  UpdateNicknameRequestDto,
  UpdateProfileImageRequestDto,
  UpdateUserInfoRequestDto,
} from "./request/user";

const DOMAIN = "http://localhost:4000";

const API_DOMAIN = `${DOMAIN}/api/v1`;

// AUTHORIZATION
const authorization = (accessToken: string) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

export const signInRequest = async (requsetBody: SignInRequsetDto) => {
  const result = await axios
    .post(SIGN_IN_URL(), requsetBody)
    .then((response) => {
      const responseBody: SignInResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response.data) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

export const signUpRequest = async (requsetBody: SignUpRequestDto) => {
  const result = await axios
    .post(SIGN_UP_URL(), requsetBody)
    .then((response) => {
      const responseBody: SignUpResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response.data) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

// USER
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;
const GET_USER_URL = (email: string) => `${API_DOMAIN}/user/${email}`;
const UPDATE_NICKNAME_URL = () => `${API_DOMAIN}/user/nickname`;
const UPDATE_PROFILE_IMAGE_URL = () => `${API_DOMAIN}/user/profile-image`;
const UPDATE_USER_INFO_URL = () => `${API_DOMAIN}/user/user-info`;

export const getSignInUserRequest = async (accessToken: string) => {
  const result = await axios
    .get(GET_SIGN_IN_USER_URL(), authorization(accessToken))
    .then((response) => {
      const responseBody: GetSignInUserResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

export const getUserRequest = async (email: string) => {
  const result = await axios
    .get(GET_USER_URL(email))
    .then((response) => {
      const responseBody: GetUserResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

export const updateNicknameRequest = async (
  requestBody: UpdateNicknameRequestDto,
  accessToken: string
) => {
  const result = await axios
    .patch(UPDATE_NICKNAME_URL(), requestBody, authorization(accessToken))
    .then((response) => {
      const responseBody: UpdateNicknameResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const updateProfileImageRequest = async (
  requestBody: UpdateProfileImageRequestDto,
  accessToken: string
) => {
  const result = await axios
    .patch(UPDATE_PROFILE_IMAGE_URL(), requestBody, authorization(accessToken))
    .then((response) => {
      const responseBody: UpdateProfileImageResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const updateUserInfoRequest = async (
  requestBody: UpdateUserInfoRequestDto,
  accessToken: string
) => {
  const result = await axios
    .patch(UPDATE_USER_INFO_URL(), requestBody, authorization(accessToken))
    .then((response) => {
      const responseBody: UpdateUserInfoResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// BOARD
const GET_POPULAR_LIST_URL = () => `${API_DOMAIN}/search/popular-list`;
const GET_RELATION_LIST_URL = (searchWord: string) =>
  `${API_DOMAIN}/search/${searchWord}/relation-list`;

export const getPopularListRequest = async () => {
  const result = await axios
    .get(GET_POPULAR_LIST_URL())
    .then((response) => {
      const responseBody: GetPopularListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

export const getRelationListRequest = async (searchWord: string) => {
  const result = await axios
    .get(GET_RELATION_LIST_URL(searchWord))
    .then((response) => {
      const responseBody: GetRelationListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

const GET_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}`;
const GET_LATEST_BOARD_LIST_URL = () => `${API_DOMAIN}/board/latest-list`;
const GET_TOP_3_BOARD_LIST_URL = () => `${API_DOMAIN}/board/top-3`;
const GET_SEARCH_BOARD_LIST_URL = (
  searchWord: string,
  preSearchWord: string | null
) =>
  `${API_DOMAIN}/board/search-list/${searchWord}${
    preSearchWord ? "/" + preSearchWord : ""
  }`;
const GET_USER_BOARD_LIST_URL = (email: string) =>
  `${API_DOMAIN}/board/user-board-list/${email}`;
const INCREASE_VIEW_COUNT_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}/increase-view-count`;
const GET_FAVORITE_LIST_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}/favorite-list`;
const GET_COMMENT_LIST_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}/comment-list`;
const POST_BOARD_URL = () => `${API_DOMAIN}/board`;
const POST_COMMENT_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}/comment`;
const UPDATE_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}`;
const PUT_FAVORITE_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}/favorite`;
const DELETE_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}`;

export const getBoardRequest = async (boardNumber: number | string) => {
  const result = await axios
    .get(GET_BOARD_URL(boardNumber))
    .then((response) => {
      const responseBody: GetBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

export const getLatestBoardListRequest = async () => {
  const result = await axios
    .get(GET_LATEST_BOARD_LIST_URL())
    .then((response) => {
      const responseBody: GetLatestBoardListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

export const getTop3BoardListRequest = async () => {
  const result = await axios
    .get(GET_TOP_3_BOARD_LIST_URL())
    .then((response) => {
      const responseBody: GetTop3BoardListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

export const getUserBoardListRequest = async (email: string) => {
  const result = await axios
    .get(GET_USER_BOARD_LIST_URL(email))
    .then((response) => {
      const responseBody: GetUserBoardListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

export const getSearchBoardListRequest = async (
  searchword: string,
  presearchword: string | null
) => {
  const result = await axios
    .get(GET_SEARCH_BOARD_LIST_URL(searchword, presearchword))
    .then((response) => {
      const responseBody: GetSearchBoardListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

export const increaseViewCountRequest = async (
  boardNumber: number | string
) => {
  const result = await axios
    .get(INCREASE_VIEW_COUNT_URL(boardNumber))
    .then((response) => {
      const responseBody: IncreaseViewCountResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

export const getFavoriteListRequest = async (boardNumber: number | string) => {
  const result = await axios
    .get(GET_FAVORITE_LIST_URL(boardNumber))
    .then((response) => {
      const responseBody: GetFavoriteListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

export const getCommentListRequest = async (boardNumber: number | string) => {
  const result = await axios
    .get(GET_COMMENT_LIST_URL(boardNumber))
    .then((response) => {
      const responseBody: GetCommentListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

export const postBoardRequest = async (
  requestBody: PostBoardRequestDto,
  accessToken: string
) => {
  const result = await axios
    .post(POST_BOARD_URL(), requestBody, authorization(accessToken))
    .then((response) => {
      const responseBody: PostBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const postCommentRequest = async (
  boardNumber: number | string,
  requestBody: PostCommentRequestDto,
  accessToken: string
) => {
  const result = await axios
    .post(
      POST_COMMENT_URL(boardNumber),
      requestBody,
      authorization(accessToken)
    )
    .then((response) => {
      const responseBody: PostCommentResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const updateBoardRequest = async (
  boardNumber: number | string,
  requestBody: UpdateBoardRequestDto,
  accessToken: string
) => {
  const result = await axios
    .patch(
      UPDATE_BOARD_URL(boardNumber),
      requestBody,
      authorization(accessToken)
    )
    .then((response) => {
      const responseBody: UpdateBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const putFavoriteRequest = async (
  boardNumber: number | string,
  accessToken: string
) => {
  const result = await axios
    .put(PUT_FAVORITE_URL(boardNumber), {}, authorization(accessToken))
    .then((response) => {
      const responseBody: PutFavoriteResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const deleteBoardRequest = async (
  boardNumber: number | string,
  accessToken: string
) => {
  const result = await axios
    .delete(DELETE_BOARD_URL(boardNumber), authorization(accessToken))
    .then((response) => {
      const responseBody: DeleteBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// FILE
const FILE_DOMAIN = `${DOMAIN}/file`;

const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;

const multipartFormData = {
  headers: { "Content-Type": "multipart/fomr-data" },
};

export const fileUploadRequest = async (data: FormData) => {
  const result = await axios
    .post(FILE_UPLOAD_URL(), data, multipartFormData)
    .then((response) => {
      const responseBody: string = response.data;
      return responseBody;
    })
    .catch((error) => {
      return null;
    });
  return result;
};
