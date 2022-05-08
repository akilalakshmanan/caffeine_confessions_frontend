import {getError} from './utils';

describe('testing error conditions', ()=> {
  it('get error with response', () => {
    const errorWResp = {
      response: {
        data:{
          message: "Data not available error"
        }
      }
    }
    expect(getError(errorWResp)).toBe("Data not available error")
  })
  it('get error without response', () => {
    const errorWOResp = {
      message: "Data mismatched error"
    }
    expect(getError(errorWOResp)).toBe("Data mismatched error")
  })
})
