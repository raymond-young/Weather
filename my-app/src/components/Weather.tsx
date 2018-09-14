    import Button from '@material-ui/core/Button';
    import * as React from 'react';
     
    

    interface IState{
    
      weathers:any[],
      table: any[],
      date: any,
      time: any,
      location: any, 
      address: any, 
      isLoading: any, 
      error: any
      
     
    }
    
    
    export default class Weather extends React.Component<{}, IState> {
      constructor(props:any){
        super(props)
        this.state = {
          weathers:[],
          date: " ",
          time: " ",
          table: [], 
          location: "",
          address: "", 
          isLoading: false, 
          error: null
              
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
      }
    
      public handleChange(event: any) {
        this.setState({location: event.target.value});
        
      }
    
      public handleSubmit(event: any) {
        const city = this.state.location;
        // const api = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=4cc8aca9ef202233ba22ab2b26cec92c';  
        const api = 'https://api.weatherbit.io/v2.0/forecast/daily?city='+ city +'&key=f12bb949839d4b0987f61fc15c504228' 

        fetch(api)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong ...');
          }
        })
        .then(data => this.setState({weathers: data.data, isLoading: false}))
        .catch(error => this.setState({error, isLoading: false}))
        event.preventDefault();
      }
    
      
    
    
      public render() {
         const {weathers, isLoading, error} = this.state;
    
         if(error){
          alert("You have type a wrong location, please try again");
          location.reload();    
          
        }
    
        if(isLoading){
          return<p>Loading ...</p>;
        }
    
        
    
    
        return (
          <div className= "centreText">
          <h2>16 Day Weather Forecast</h2>
            <form onSubmit={this.handleSubmit}>
              <label>
              Location: 
                 <input type="text" placeholder="Enter a city e.g. Auckland " value={this.state.location} onChange={this.handleChange} />
              </label>
              
              <Button variant="contained" type="submit" value="Submit" className="button" size="medium" style={{maxWidth: '40px', maxHeight: '40px', minWidth: '10px', minHeight: '10px'}} > Enter </Button>
            </form>

            <div className="showWeather">
            <table className="table">
                <tr>
                    <th> Date </th>
                    <th> Description </th>
                    <th> Temperature Range </th>
                    <th> Wind Speed </th>
                </tr>
                {
                   
                  weathers.map((data) =>
  
                        <tr key={data}>
                        <td>{data.datetime} </td>
                        <td>{data.weather.description} </td>
                        {/* <img src= "https://www.weatherbit.io/static/img/icons/\{data.weather.icon\}.png" height="50" width="50"/>  */}
                        <td>Low: {data.min_temp}°C, High: {data.max_temp}°C </td>
                        <td>Wind speed: {data.wind_spd}, {data.wind_cdir}</td>
                        </tr>
                    )
                    // <tr key={data}><td>{data.datetime} </td><td>test1</td><td>test2</td></tr>
                    // <tr key={hit}><td>{hit.dt_txt}</td><td>{hit.weather[0].main} and {hit.weather[0].description}. High {hit.main.temp_max}. Winds is at {hit.wind.speed} km/h </td>
                    // <td><img src="https://imgur.com/19uj8tj.jpg" height="25" width="25"/>{hit.main.temp_min}°C - {hit.main.temp_max}°C<br/><img src="https://imgur.com/JSTATIY.jpg" height="25" width="25"/> Pressure: {hit.main.pressure}<br/><img src="https://imgur.com/Xz9sgO5.jpg" height="25" width="25"/> {hit.wind.speed} km/h <br/> <img src="https://imgur.com/YkohH8M.jpg" height="25" width="17"/> {hit.main.humidity}%</td></tr>
         
                  }
              </table>
            </div>
          </div>
          
        );
      }
      
    }