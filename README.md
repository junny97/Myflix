### ⛓ node_modules

| 모듈명              | 용도                                   |
| ------------------- | -------------------------------------- |
| axios               | 서버 통신                              |
| framer-motion       | 애니메이션 효과                        |
| react-query         | Data Fetching 관리                     |
| react-rotuer-dom    | 라우팅 구현                            |
| react-hook-form     | 입력 폼 상태&유효성 검사 관리          |


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
