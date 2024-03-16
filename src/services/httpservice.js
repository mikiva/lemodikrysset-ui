class HttpService {

    async get(url, config = {}) {
        config["METHOD"] = "GET"
        return await this.doFetch(url, config)
    }


    async doFetch(url, config) {
        return await fetch(url, config)
    }

}
const httpService = new HttpService()


export default httpService;