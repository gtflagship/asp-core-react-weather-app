using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using WheatherBelfast.Models;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace WheatherBelfast.Controllers
{
    public class HomeController : Controller
    {
        private static HttpClient _httpClient;
        private DayForecast[] _forecast;
        static HomeController()
        {
            _httpClient = new HttpClient();
        }

        public ActionResult Index()
        {
            return View();
        }

        [Route("forecast")]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<ActionResult> Forecast()
        {
            await RefreshWeatherForecast();
            return Json(_forecast);
        }

        private async Task RefreshWeatherForecast()
        {
            var weatherResponse = await _httpClient.GetAsync("https://www.metaweather.com/api/location/44544/");
            var weatherForecast = JsonConvert.DeserializeObject<WeatherResponse>(await weatherResponse.Content.ReadAsStringAsync());
            _forecast = weatherForecast.FiveDayForecast;
        }
    }
}
