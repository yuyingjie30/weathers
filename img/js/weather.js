
//1.获取默认城市的天气信息
//2.获取所有城市的信息
//3.点击每个城市可以获取当前城市的天气信息
//4.在搜索框内输入要搜索的城市,点击搜索按钮可以进行搜索

    //1.获取当前城市的天气信息
    $.ajax({
        type:"get",
        url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
        dataType:"jsonp",
        success:function (obj) {
            let tianqi=obj.data;
            update(tianqi);
        }
    });

    function update(tianqi) {
        //获取当前的城市
        $(".top-center>span").html(tianqi.city);
        //获取当前城市的天气状况
        $(".info>p").html(tianqi.weather.quality_level);
        //获取当前的温度
        $(".imgs-center>h1").html(tianqi.weather.current_temperature+" °");
        //获取当前
        $(".imgs-center>.one").html(tianqi.weather.current_condition);
        //获取当前风的方向
        $(".imgs-center>.three").html(tianqi.weather.wind_direction);
        // $(".imgs-center").html(tianqi.weather.current_condition);
        // $(".imgs-center>.four").html(tianqi.weather.wind_level+"级");
        $(".weather-info>p.five").html(tianqi.weather.forecast_list[1].condition);
        $(".weather-right span.lowtem").html(tianqi.weather.forecast_list[1].low_temperature);
        $(".weather-right span.hightem").html(tianqi.weather.forecast_list[1].high_temperature+"°C");
        // 24小时
        let hweather=tianqi.weather.hourly_forecast;
        hweather.forEach(function (v) {
            let str=`<li>
					<p class="item">${v.hour}:00</p>
					<img src="img/${v.weather_icon_id}.png" alt="">
					<p>${v.temperature}°C</p>
				</li>`;
            $(".w24-hours>ul").append(str);
            // let li=document.createElement("li");
            // $().append(li);
            // $().append(".w24-hours>ul>li>p")
            // let span=document.createElement("span");
            // $().append(span)
        });
        //7天
        let fweather=tianqi.weather.forecast_list;
        // console.log(fweather);
                for(let i=0;i<7;i++){
                let str = `<li>
					<p>昨天</p>
					<p>${fweather[i].date.slice(5, 10)}</p>
					<div class="daytime">
						<p>${fweather[i].condition}</p>
                            <img src="img/${fweather[i].weather_icon_id}.png" alt="" />
					</div>
					<div class="night">
						<img src="img/31.png" alt="" />
						<p class="cloud">多云</p>
						<p>西北风3级</p>
					</div>
				</li>`;
                $(".w7-days>ul").append(str);
                // let li=document.createElement("li");
                // $().append(li);
                // $().append(".w24-hours>ul>li>p")
                // let span=document.createElement("span");
                // $().append(span)
                }
        }
    //今天的天气
    $.ajax({
        type:"get",
        url:"https://www.toutiao.com/stream/widget/local_weather/city/",
        dataType:"jsonp",
        success:function (obj) {
            city1=obj.data;
            // console.log(city1);
            updateCity(city1);
        }
    });
    // //获取每个城市信息
    function updateCity(city1) {
        for(let i in city1){
            let str1=`<p  class="pro">${i}</p>`;
            $(".hot>ul").append(str1);
            // let ul=document.createElement("ul");
            // $("").append(str);
            // $().addClass("");
            // $().html();

            for(let j in city1[i]){
                // let ul=document.createElement("ul");
                let str2=`<li>${j}</li>`;
                $(".hot>ul").append(str2);
            }
        }
    }

    //点击每一个城市,获取当前城市的天气信息
    window.onload=function () {
        $(".top-center").click(function(){
            $(".searchpage").css("display","block");
        });
        $(".header>i").click(function () {
            $(".searchpage").css("display","none");
        });
      $("li").click(function () {
          $(".searchpage").css("display","none");
          let con=$(this).html();
          // console.log(con);
          ajaxs(con);
      });
//获取某个城市的信息
        function ajaxs(con) {
            let url1="https://www.toutiao.com/stream/widget/local_weather/data/?city="+con+"";
            $.ajax({
                type:"get",
                url:url1,
                dataType:"jsonp",
                success:function (obj) {
                    $(".w24-hours>ul>li").remove();
                    $(".w7-days>ul>li").remove();
                let tianqi2=obj.data;
                update(tianqi2);
            }
            })
        }
        //在搜索框内输入内容,可以搜索当前城市的天气预报
        $(".input").focus(function () {
//      	let ele=e.target;
//      	ele.html();
			$(".input").html("");
            $(".search>p").html("搜索");
            console.log($(".search>p"));
        });
        // console.log($(".search>a").html("搜素"));
        //当点击搜索框,获取

        $(".search>p").click(function () {
            $(".searchpage").css("display","none");
            let text=$("input").val();

            let flag=false;
            // console.log(text);
            for(let i in city1){
                console.log(city1);
                for(let j in city1[i]) {
                    console.log(j);
                    if (text == j) {
                        // ajaxs(text);
                        flag = true;
                        break;
                    }
                }
            }  if(flag==true){
                // flag=false;
                ajaxs(text);
                $(".searchpage").css("display","none");
                return;
            }else{
                alert("没有该城市");
                return;
            }
            ajaxs(text);
        })
    };






