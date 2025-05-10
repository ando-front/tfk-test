function doPost(e) {
  try {
    // リクエストデータの解析
    const data = JSON.parse(e.postData.contents);
    
    // 必須フィールドの検証
    const requiredFields = ['email', 'name', 'facility', 'start', 'end'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return createResponse({
          status: 'error',
          message: `${field}は必須です。`
        });
      }
    }
    
    // 日時の検証
    const startTime = new Date(data.start);
    const endTime = new Date(data.end);
    
    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      return createResponse({
        status: 'error',
        message: '無効な日時形式です。'
      });
    }
    
    if (startTime >= endTime) {
      return createResponse({
        status: 'error',
        message: '終了時間は開始時間より後である必要があります。'
      });
    }
    
    // 営業時間の検証 (9:00-22:00)
    const openingHour = 9;
    const closingHour = 22;
    
    if (startTime.getHours() < openingHour || endTime.getHours() >= closingHour) {
      return createResponse({
        status: 'error',
        message: `営業時間（${openingHour}:00〜${closingHour}:00）内で予約してください。`
      });
    }
    
    // 予約の重複チェックと定員確認
    // ここでは簡略化のため、スプレッドシートやCalendar APIとの連携は省略
    
    // 予約の保存処理
    // ここでは成功を返すだけ
    return createResponse({
      status: 'success',
      message: '予約が完了しました。',
      data: {
        reservationId: 'DEMO-' + new Date().getTime()
      }
    });
    
  } catch (error) {
    return createResponse({
      status: 'error',
      message: 'サーバーエラーが発生しました: ' + error.message
    });
  }
}

function createResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

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
