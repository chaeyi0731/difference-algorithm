/**
 * ? Q. JSON 파일을 아래의 5, 6번에 해당하는 로직 작성 후 JSON으로 저장
 * ? Q. 저장이 완료되면 초기화된 result에 객체를 리턴
 *
 * * 1. inputJSONdata, outputJSONdata를 읽어서 JSON 객체로 변환
 * * 2. inputJSONdata, outputJSONdata의 value를 비교
 * * 3. outputJSONpath 매개변수의 key에 해당하는 정보를 저장
 * * 4. dirrences.json 파일에 필요한 상태값
 * * 5. 같은 단어가 무엇인지 저장
 * * 6. 다른 단어가 무엇인지 저장
 * * 7. 리턴을 통해 결과값을 전달
 */

/**
 *
 * @param {JSON, Path} inputJSONdata
 * @param {JSON, Path} outputJSONdata
 * @returns Object
 */

import fs from 'fs';

export default function (inputJSONPath, outputJSONPath) {
  if (!inputJSONPath.endsWith('.json') || !outputJSONPath.endsWith('.json')) {
    throw new Error(
      `매개변수 ${inputJSONPath}, ${outputJSONPath}는 json 파일이 아닙니다.`
    );
  }

  // 1. JSON 파일을 읽어서 JSON 객체로 변환
  const inputJSONData = JSON.parse(fs.readFileSync(inputJSONPath, 'utf8'));
  const outputJSONData = JSON.parse(fs.readFileSync(outputJSONPath, 'utf8'));

  // 2. inputJSONData와 outputJSONData의 value를 비교

  //* result.sameWords와 result.differenceWords 변수를 이용한 비교가 이미 구현되어 있어 inputValues와 outputValues 변수는 사용하지 않는다
  const inputValues = Object.values(inputJSONData);
  const outputValues = Object.values(outputJSONData);

  // 이후의 로직을 구현하기 위해 변수를 초기화합니다.
  // * 초기화를 하지 않아도 진행은 가능 하지만 초기화를 통해 변수를 명시적으로 설정하는 것은 코드의 가독성을 높이고 논리적인 오류를 방지 할 수 있고 다른 개발자가 보았을 때 가독성이 올라간다.

  let result = {
    sameWords: [],
    differenceWords: [],
  };

  // 3. outputJSONPath 매개변수의 key에 해당하는 정보를 저장
  const keysToStore = Object.keys(inputJSONData); // inputJSONData의 모든 키를 가져옵니다.
  //* json의 output은 differences.json의 "operator"와 "operand"이 해당된다.

  keysToStore.forEach((key) => {
    // outputJSONData 객체에 해당 키와 값을 저장합니다.
    outputJSONData[key] = inputJSONData[key];
  });

  // 4. differences.json 파일에 필요한 상태값 저장
  //* fs.writeFileSync 함수를 통해 differences.json 파일의 outputJsonData의 객체를 json으로 저장한다.
  //* JSON.stringify를 사용하여 json 문자열로 변환한다.
  //* null, 2은 들여쓰기 'utf8'은 파일의 인코딩을 지정
  fs.writeFileSync(
    outputJSONPath,
    JSON.stringify(outputJSONData, null, 2),
    'utf8'
  );
  // 5. 같은 단어가 무엇인지 저장
  //* Object.keys(inputJSONData)를 사용하여 inputJSONData의 모든 키(프로퍼티)를 가져온다
  //* filter 함수를 사용하여 같은 단어와 다른 단어를 구분하고 result 객체에 저장
  result.sameWords = Object.keys(inputJSONData).filter((key) => {
    return inputJSONData[key] === outputJSONData[key];
  });

  // 6. 다른 단어가 무엇인지 저장
  //* === 이 아닌 !== 느낌표를 추가해 다른 것을 판단
  result.differenceWords = Object.keys(inputJSONData).filter((key) => {
    return inputJSONData[key] !== outputJSONData[key];
  });

  //7. 리턴을 통하여 결과값 도출
  return result;
}
