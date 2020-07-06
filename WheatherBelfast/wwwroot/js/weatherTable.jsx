class WeatherTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], lastUpdated: "" };

    }
    //Load weather from API and refresh every minute 
    componentDidMount() {
        this.loadForecastFromServer();
        window.setInterval(
            () => this.loadForecastFromServer(),
            this.props.pollInterval,
        );
    }
    loadForecastFromServer() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            const dateTime = new Date().toLocaleString();
            this.setState({ data: data, lastUpdated: dateTime });
        };
        xhr.send();
    }
    getWeatherStateImageUrlSuffix(weatherState) {
        switch (weatherState) {
            case "Snow":
                return "sn";
            case "Sleet":
                return "sl";
            case "Hail":
                return "h";
            case "Thunderstorm":
                return "t";
            case "Heavy Rain":
                return "hr";
            case "Light Rain":
                return "lr";
            case "Showers":
                return "s";
            case "Heavy Cloud":
                return "hc";
            case "Light Cloud":
                return "lc";
            case "Clear":
                return "c";
            default:
                return "c";
        }
    }
    render() {
        var tableRows = [];
        if (this.state.data) {
            //add the weather data to the table
            tableRows = this.state.data.map(forecast => (
                <tr key={forecast.id}>
                    <td>
                        <img src={`https://www.metaweather.com/static/img/weather/ico/${this.getWeatherStateImageUrlSuffix(forecast.weatherState)}.ico`}/>
                    </td>
                    <td>{forecast.date}</td>
                    <td>{forecast.weatherState}</td>
                    <td>{Math.round(forecast.maximumTemp)}°C</td>
                    <td>{Math.round(forecast.minimumTemp)}°C</td>
                    <td>{forecast.predictability}%</td>
                </tr>
            ));
        }
        return (
            <div>
                <table className='pure-table'>
                <thead>
                    <tr>
                        <th/>
                        <th>Date</th>
                        <th>Forecast</th>
                        <th>Highs Of</th>
                        <th>Lows Of</th>
                        <th>Probability</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
                </table>
            <div>
                <h3>Forecast last updated: {this.state.lastUpdated}</h3>
            </div>
                </div>
        );
}
}

ReactDOM.render(
    <WeatherTable url="/forecast" pollInterval={60000} />,
    document.getElementById('content')
);