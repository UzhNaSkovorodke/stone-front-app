interface UserData {
  phone: string
  first_name: string
  email: string
  middle_name?: string
  last_name?: string
  agent_flg?: boolean
  passport_ser?: string
  passport_num?: string
  passport_unitcode?: string
  passport_unitname?: string
  passport_obtdt?: string
  gender?: string
  birth_date?: string
  birth_place?: string
  reg_address?: string
  res_address?: string
  created_at?: string
  updated_at?: string
  token: string
}

export default class User {
  authToken: string
  userData: {}
  tokenKey: string

  constructor() {
    // this.authToken = '25|D53uwDX1El3hJmRDRBWk9FdIER6Uz18fRZJKVLkD' //admin
    this.authToken = '' //user
    this.userData = {}
    this.tokenKey = ''
  }

  handleLogin(userData: UserData) {
    const user = {
      userData: {
        name: userData.first_name,
        phone: userData.phone,
        email: userData.email,
      },
      tokenKey: userData.token,
    }
    localStorage.setItem('User', JSON.stringify(user))
  }

  handleLogout() {
    localStorage.removeItem('User')
  }
}
