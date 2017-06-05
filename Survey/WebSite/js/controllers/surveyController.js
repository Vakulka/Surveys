myApp.controller('surveyController', function ($scope) {

    $scope.questionTypes = {
        radiobutton: 'radiobutton',
        checkbox: 'checkbox',
        combobox: 'combobox',
        groupQuestions: 'groupQuestions'
    };

    var USER_INPUT = '%UserInput%';
  $scope.questions = getQuestionForSurvey($scope,'');
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
          
          if (item.type == this.questionTypes.groupQuestions) {
              item.shortQuestions.forEach(function (shortQuestion) {
                  var answer = getAnswerFromQuestion.apply(this, [shortQuestion]);
                  addElementsToArray(answers, answer);
              }, this);
          }
          else {
              var answer = getAnswerFromQuestion.apply(this, [item]);
              addElementsToArray(answers, answer);
          }
      },this);
      this.answers = getAnswerToString(answers);
  };
  
  function addElementsToArray(array, elements) {
      console.log(typeof elements);
      if (elements.length > 0) {
          elements.forEach(function (item) {
              array.push(item);
          });
      }
      else {
          array.push(elements);
      }
        

  }
  function getAnswerFromQuestion(question) {
      var result;
      switch (question.type) {
          case this.questionTypes.combobox:
          case this.questionTypes.radiobutton:
              if (question.selected == USER_INPUT) {
                  result = {
                      id: question.id,
                      answer: question.userInput ? question.userInput : '',
                      userInput: true
                  };
              }
              else {
                  result = { id: question.id, answer: question.selected ? question.selected : '' };
              }
              break;
          case this.questionTypes.checkbox:
              result = [];
              question.values.forEach(function (answerItem) {
                  if (answerItem.selected) {
                      if (answerItem.value == USER_INPUT) {
                          result.push({
                              id: question.id,
                              answer: answerItem.userInput ? answerItem.userInput : '',
                              userInput: true
                          });
                      }
                      else {
                          result.push({ id: question.id, answer: answerItem.value });
                      }
                  }
              });
              if (result.length == 0) {
                  result = { id: question.id, answer: '' };
              }
              break;
      }
      return result;
  };

  $scope.shortQuestionCheckboxChanged = function (shortQuestion, value, state) {


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

  function getQuestionForSurvey($scope,id) {
      var questions = [{
          title: 'Question1',
          id: 'idQuestion1',
          context: 'Please estimate some process 10 scale',
          type: $scope.questionTypes.combobox,
          values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      }, {
          title: 'Question2',
          id: 'idQuestion2',
          context: 'How do you think is question 2',
          type: $scope.questionTypes.radiobutton,
          values: ['value2-1', 'value2-2'],
          selected: 'value2-2'
      }, {
          title: 'Question3',
          id: 'idQuestion3',
          context: 'How do you think is question 3',
          type: $scope.questionTypes.radiobutton,
          //selected: USER_INPUT,
          values: ['value3-1', 'value3-2', USER_INPUT]
          
      },
      {
          title: 'Question4',
          id: 'idQuestion4',
          context: 'How do you think is question 4',
          type: $scope.questionTypes.checkbox,
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
          type: $scope.questionTypes.checkbox,
          values: [
              { value: USER_INPUT }
          ],
          default: USER_INPUT
      },
      {
          title: 'Group questions',
          type: $scope.questionTypes.groupQuestions,
          subtype: $scope.questionTypes.checkbox,
          userInput: true,
          values: [
              { value: 1 },
              { value: 2 },
              { value: 'text' },
              { value: 5, },
              { value: USER_INPUT }
          ],
          shortQuestions: [
              { context: 'idQuestion6', id: 'idQuestion6' },
              { context: 'idQuestion7', id: 'idQuestion7' },
              { context: 'idQuestion8', id: 'idQuestion8' },
              { context: 'idQuestion9', id: 'idQuestion9' },
          ]
      }];

      questions = addValuesToShortQuestions($scope, questions);
      return questions;
  };
  function addValuesToShortQuestions($scope, questions) {
      questions.forEach(function (group) {
          if (group.type == $scope.questionTypes.groupQuestions) {
              group.shortQuestions.forEach(function (shortQuestion) {
                  shortQuestion.values = JSON.parse(JSON.stringify(group.values));
                  shortQuestion.type=group.subtype;
              });
          }
      });
      return questions;
  }
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