class UserServices {
      constructor() {
            this.baseUrl = `http://localhost:3333`
            this.password = "1ecbAa398"
      }

      async request(url, method = "GET", body, authToken) {
            const headers = {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  "x-access-password": this.password

            }
            if (authToken) {
                  headers['Authorization'] = `Bearer ${authToken}`
            }

            const options = { method, headers }

            if (body) {
                  options.body = JSON.stringify(body)
            }

            try {
                  const response = await fetch(url, options)
                  if (!response.ok) {
                        throw new Error('Xatolik yuz berdi')
                  }
                  return await response.json()
            } catch (error) {
                  console.log(error)
            }
      }

      async sendEmail(email) {
            return this.request(`${this.baseUrl}/user`, 'POST', { email })
      }
}

const userServices = new UserServices()
export default userServices