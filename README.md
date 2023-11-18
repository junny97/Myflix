### ⛓ node_modules

| 모듈명              | 용도                                   |
| ------------------- | -------------------------------------- |
| axios               | 서버 통신                              |
| framer-motion       | 애니메이션 효과                        |
| react-query         | Data Fetching 관리                     |
| react-rotuer-dom    | 라우팅 구현                            |
| react-hook-form     | 입력 폼 상태&유효성 검사 관리          |
| react-responsive    | 반응형 구현                            |
| react-device-detect | 반응형 구현                            |
| redux               | 상태관리                               |
| redux-toolkit       | redux 편의성, redux-toolkit thunk 사용 |
| uuid                | 고유 아이디 생성                       |
| swiper              | 슬라이더 구현                          |
| sweetAlert          | alert, confirm 커스텀                  |

<br>

```js
export const getDetailData = async (mediaType: string, movieId: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${mediaType}/${movieId}?api_key=${API_KEY}&language=ko`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSimilarData = async (mediaType: string, movieId: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${mediaType}/${movieId}/similar?api_key=${API_KEY}&language=ko`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
```
