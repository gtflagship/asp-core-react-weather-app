using Newtonsoft.Json;

namespace WheatherBelfast.Models
{
    public class DayForecast
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("weather_state_name")]
        public string WeatherState { get; set; }
        [JsonProperty("applicable_date")]
        public string Date { get; set; }
        [JsonProperty("min_temp")]
        public double MinimumTemp { get; set; }
        [JsonProperty("max_temp")]
        public double MaximumTemp { get; set; }
        [JsonProperty("predictability")]
        public int Predictability { get; set; }
    }
}
