// テスト関数
function testDoPost_valid() {
  const mockRequest = {
    postData: {
      contents: JSON.stringify({
        email: 'test@example.com',
        name: 'テストユーザー',
        facility: 'フィットネス',
        start: '2025-05-10T10:00:00',
        end: '2025-05-10T11:00:00',
      })
    }
  };
  const response = doPost(mockRequest);
  Logger.log(response.getContent());
}

function testDoPost_invalidTime() {
  const mockRequest = {
    postData: {
      contents: JSON.stringify({
        email: 'test@example.com',
        name: 'テストユーザー',
        facility: 'フィットネス',
        start: '2025-05-10T08:00:00',
        end: '2025-05-10T09:00:00',
      })
    }
  };
  const response = doPost(mockRequest);
  Logger.log(response.getContent());
}

function testDoPost_overCapacity() {
  // このテストは既に定員を超える予約がある場合に正しくエラーを返すか確認する必要があります。
  const mockRequest = {
    postData: {
      contents: JSON.stringify({
        email: 'over@test.com',
        name: '満員ユーザー',
        facility: 'フィットネス',
        start: '2025-05-10T14:00:00',
        end: '2025-05-10T15:00:00',
      })
    }
  };
  const response = doPost(mockRequest);
  Logger.log(response.getContent());
}
