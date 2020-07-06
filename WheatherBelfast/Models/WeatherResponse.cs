using Newtonsoft.Json;

namespace WheatherBelfast.Models
{
    public class WeatherResponse
    {
        [JsonProperty("title")]
        public string location { get; set; }
        [JsonProperty("consolidated_weather")]
        public DayForecast[] FiveDayForecast { get; set; }
    }
}
