/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    didInsertElement: function() {
        this.set('title', 'Train data');
        this.set('subTitle', 'Average weight distribution (%)');
        var obj = this;

        var url = 'http://localhost:9292/weight.json?from=2015-09-01T08:00:00&to=2015-09-01T09:00:00&interval=10s';

        this.getData(url)
            .then(
                function(data){
                    // success
                    console.log('train-data > getData > success');

                    var xAxis = ['x'];
                    var yAxis = ['weight'];

                    for (var i = 0; i < data.results.length; i++) {
                        var item = data.results[i];
                        xAxis.push(new Date(item.timestamp));
                        yAxis.push(item.value);
                    }

                    obj.set('graphParams',
                        {
                            data: {
                                columns: [
                                    xAxis,
                                    yAxis
                                ],
                                x: 'x',
                                type: 'line',
                                colors: {
                                    weight: '#7ED321',
                                }
                            },
                            axis: {
                                x: {
                                    type: 'timeseries',
                                    tick: {
                                      format: function(d) {
                                        return d3.time.format("%H:%M:%S")(d)
                                      },
                                      count: (d3.time.minute, 10),
                                      padding: {
                                        left: 0,
                                        right: 0
                                      }
                                    }
                                },
                                y: {
                                    tick: {
                                        count: 5,
                                        format: d3.format('.0f'),
                                    },
                                    max: 100,
                                    min: 0,
                                    padding: {
                                      top: 0,
                                      bottom: 0
                                    }
                                }
                            }
                        });

                    // data is the response Object/Array from the AJAX request
                    // var items = [];
                    // data.result.records.forEach((tmpItem) => {
                    //     var id = hebeutils.guid();
                    //     var item = {
                    //         id: id,
                    //         street: tmpItem.Street,
                    //         ward: tmpItem.Ward,
                    //         lat: (tmpItem.Lat == null ? tmpItem["Lat "] : tmpItem.Lat),
                    //         lng: tmpItem.Long,
                    //         type: tmpItem.Type,
                    //         colour: tmpItem.Colour
                    //     };
                    //
                    //     items.push(item);
                    // });
                    // obj.set('items', items);
                    // setTimeout(() => {
                    //     obj.set('loaded', true);
                    // });
                },
                function(error) {
                    // failure
                    console.log('train-data > getData > error: ' + error);
                },
                function(){
                    // complete
                }
            )
    }
});
