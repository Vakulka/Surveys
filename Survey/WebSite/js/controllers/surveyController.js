myApp.controller('surveyController', function ($scope) {

    $scope.questionTypes = {
        radiobutton: 'radiobutton',
        checkbox: 'checkbox',
        combobox: 'combobox',
    };

    var USER_INPUT = '%UserInput%';
  $scope.questions = getQuestionForSurvey.call($scope,'');
  $scope.surveys = getSurveys('');
  $scope.parameters = getSearchParameters();
  $scope.answers;


  $scope.loadQuestions = function () {
      if (this.parameters && this.parameters["id"]) {
          this.questions = getQuestionForSurvey(this.parameters["id"]);
      }
  };
  $scope.emptyItemFunction = function (item) {
      console.log(item);
  };
  
  $scope.CallRESTWCFService = function() {
      $.getJSON("http://localhost:49923/SurveysService/GetData", {},
        function (data) {
            alert(data);
        });
  }

  $scope.addItem = function (text, price) {

  };

  $scope.openSurvey = function (item) {
      console.log(item.name);
      window.open('survey.html'+'?id='+item.id);
  };

  $scope.editSurvey = function (item) {
      console.log(item.name);
      window.open('editSurvey.html' + '?id=' + item.id);
  };

  $scope.processItem = function (item) {
      console.log(item.selected);
  };

  $scope.saveSurvey = saveSurvey;

  function saveSurvey () {
      var answers = [];
      this.questions.forEach(function (item) {
          switch (item.type) {
              case this.questionTypes.combobox:
              case this.questionTypes.radiobutton:
                  if (item.selected == USER_INPUT) {
                      answers.push({
                          id: item.id,
                          answer: item.userInput ? item.userInput : '',
                          userInput: true
                      });
                  }
                  else {
                      answers.push({ id: item.id, answer: item.selected ? item.selected : '' });
                  }
                  break;
              case this.questionTypes.checkbox:
                  item.values.forEach(function (answerItem) {
                      if (answerItem.selected) {
                          if (answerItem.value == USER_INPUT) {
                              answers.push({
                                  id: item.id,
                                  answer: answerItem.userInput ? answerItem.userInput : '',
                                  userInput: true
                              });
                          }
                          else {
                              answers.push({ id: item.id, answer: answerItem.value });;
                          }
                      }
                  });
                  break;




          }
      }, this);
      this.answers = getAnswerToString(answers);

      
  };

  function getAnswerToString(answers) {
      var result = '';
      answers.forEach(function (item) {
          result += "id:" + item.id + ", answer:" + item.answer;
          if (item.userInput) result += ", userInput: " + item.userInput;
          result += "<br>";
      });
      return result;
  };

  function getSearchParameters() {
      var prmstr = window.location.search.substr(1);
      return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
  };

  function transformToAssocArray(prmstr) {
      var params = {};
      var prmarr = prmstr.split("&");
      for (var i = 0; i < prmarr.length; i++) {
          var tmparr = prmarr[i].split("=");
          params[tmparr[0]] = tmparr[1];
      }
      return params;
  };

  function getQuestionForSurvey(id) {
      return [{
          title: 'Question1',
          id: 'idQuestion1',
          context: 'Please estimate some process 10 scale',
          type: this.questionTypes.combobox,
          values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      }, {
          title: 'Question2',
          id: 'idQuestion2',
          context: 'How do you think is question 2',
          type: this.questionTypes.radiobutton,
          values: ['value2-1', 'value2-2'],
          selected: 'value2-2'
      }, {
          title: 'Question3',
          id: 'idQuestion3',
          context: 'How do you think is question 3',
          type: this.questionTypes.radiobutton,
          //selected: USER_INPUT,
          values: ['value3-1', 'value3-2', USER_INPUT]
          
      },
      {
          title: 'Question4',
          id: 'idQuestion4',
          context: 'How do you think is question 4',
          type: this.questionTypes.checkbox,
          values: [
              { value: 5 },
              { value: 10 },
              { value: USER_INPUT }
                ],
          default: '5'
      },
      {
          title: 'Comments',
          id: 'idQuestion5',
          context: 'Please leave comments about this survey',
          type: this.questionTypes.checkbox,
          values: [
              { value: USER_INPUT }
          ],
          default: USER_INPUT
      }];
  };
  function getSurveys(userId) {
      return [{
          name: 'Survey 1',
          id: '111bgd2',
          owner: 'User 1',
          dateCreated: '12/04/2017'
      }, {
          name: 'Survey 2',
          id: '22242gf',
          owner: 'User 1',
          dateCreated: '12/01/2017'
      }, {
          name: 'Survey 3',
          id: '3333',
          owner: 'User 3',
          dateCreated: '22/04/2017'
      }];
  };
});