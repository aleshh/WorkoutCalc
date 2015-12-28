var model = {
  exercises: ['sq', 'bp', 'dl', 'sp', 'pc'],
  currentExerciseWeights: [],
  lastWeights: {},
  // pastWorkouts: [],

  calculateSets: function() {
    switch(this.currentExercise) {
      case 'sq':
        this.currentExerciseSets = [2, 1, 1, 1, 3];
        this.currentExerciseReps = [5, 5, 3, 2, 5];
        this.currentExerciseWeights[0] = 45;
        this.currentExerciseWeights[1] = Math.floor(this.workWeight * 0.08) * 5;
        this.currentExerciseWeights[2] = Math.floor(this.workWeight * 0.12) * 5;
        this.currentExerciseWeights[3] = Math.floor(this.workWeight * 0.16) * 5;
        this.currentExerciseWeights[4] = this.workWeight;
        break;
      case 'bp':
        this.currentExerciseSets = [2, 1, 1, 1, 3];
        this.currentExerciseReps = [5, 5, 3, 2, 5];
        this.currentExerciseWeights[0] = 45;
        this.currentExerciseWeights[1] = Math.floor(this.workWeight * 0.1) * 5;
        this.currentExerciseWeights[2] = Math.floor(this.workWeight * 0.14) * 5;
        this.currentExerciseWeights[3] = Math.floor(this.workWeight * 0.18) * 5;
        this.currentExerciseWeights[4] = this.workWeight;
        break;
      case 'dl':
        this.currentExerciseSets = [2, 1, 1, 1];
        this.currentExerciseReps = [5, 3, 2, 5];
        this.currentExerciseWeights = [];
        this.currentExerciseWeights[0] = Math.floor(this.workWeight * 0.08) * 5;
        this.currentExerciseWeights[1] = Math.floor(this.workWeight * 0.12) * 5;
        this.currentExerciseWeights[2] = Math.floor(this.workWeight * 0.17) * 5;
        this.currentExerciseWeights[3] = this.workWeight;
        break;
      case 'sp':
        this.currentExerciseSets = [2, 1, 1, 1, 3];
        this.currentExerciseReps = [5, 5, 3, 2, 5];
        this.currentExerciseWeights[0] = 45;
        this.currentExerciseWeights[1] = Math.floor(this.workWeight * 0.11) * 5;
        this.currentExerciseWeights[2] = Math.floor(this.workWeight * 0.14) * 5;
        this.currentExerciseWeights[3] = Math.floor(this.workWeight * 0.17) * 5;
        this.currentExerciseWeights[4] = this.workWeight;
        break;
      case 'pc':
        this.currentExerciseSets = [2, 1, 1, 1, 5];
        this.currentExerciseReps = [5, 5, 3, 2, 3];
        this.currentExerciseWeights[0] = 45;
        this.currentExerciseWeights[1] = Math.floor(this.workWeight * 0.11) * 5;
        this.currentExerciseWeights[2] = Math.floor(this.workWeight * 0.14) * 5;
        this.currentExerciseWeights[3] = Math.floor(this.workWeight * 0.17) * 5;
        this.currentExerciseWeights[4] = this.workWeight;
        break;
    }
    for (var i = 0; i < this.currentExerciseWeights.length; i ++) {
      if (this.currentExerciseWeights[i] < 45) {
        this.currentExerciseWeights[i] = 45;
      }
    }
    view.workoutView();
  },

  exerciseName: function(exercise) {
    switch (exercise) {
      case 'sq': return 'Squat';
      case 'bp': return 'Bench Press';
      case 'dl': return 'Dead&shy;lift';
      case 'sp': return 'Press';
      case 'pc': return "Power Clean";
    }
  },

  nextExercise: function() {
    if (this.currentWorkout == 'sqBpDl') {
      switch (this.currentExercise) {
        case 'sq': this.currentExercise = 'bp'; break;
        case 'bp': this.currentExercise = 'dl'; break;
        case 'dl': this.currentExercise = 'done';
      }
    } else {
      switch (this.currentExercise) {
        case 'sq': this.currentExercise = 'sp'; break;
        case 'sp': this.currentExercise = 'pc'; break;
        case 'pc': this.currentExercise = 'done';
      }
    }
  },

  initializeStorage: function() {
    if (this.currentWorkout == 'sqBpDl') {
      this.storeExercise = {
        date: new Date(),
        workout: 'sqBpDl',
        exercises: [
          { exercise: 'sq', currentWeight: 0, nextWeight: 0 },
          { exercise: 'bp', currentWeight: 0, nextWeight: 0 },
          { exercise: 'dl', currentWeight: 0, nextWeight: 0 }
        ]
      };
    } else {
      this.storeExercise = {
        date: new Date(),
        workout: 'sqSpPc',
        exercises: [
          { exercise: 'sq', currentWeight: 0, nextWeight: 0 },
          { exercise: 'sp', currentWeight: 0, nextWeight: 0 },
          { exercise: 'pc', currentWeight: 0, nextWeight: 0 }
        ]
      };
    }
  },

  recordExercise: function() {
    console.log('recordExercise next: ' + this.nextWeight);
    var e = {
      exercise:      this.currentExercise,
      currentWeight: this.workWeight,
      nextWeight:    this.nextWeight
    };
    var i = 0;
    switch (this.currentExercise) {
      case 'bp': i = 1; break;
      case 'sp': i = 1; break;
      case 'dl': i = 2; break;
      case 'pc': i = 2; break;
    }
    this.storeExercise.exercises[i] = e;
  },

  loadData: function() {
    this.lastWeights = { sq: {}, bp: {}, dl: {}, sp: {}, pc: {} };
    this.pastWorkouts = JSON.parse(localStorage.getItem("pastWorkouts"));
    //this line outputs all stored workouts to console:
    //console.log('loadData pastWorkouts before: ' + JSON.stringify(this.pastWorkouts, null, 2));
    if (!this.pastWorkouts) {
      this.pastWorkouts = [];
    } else {

      var last = this.pastWorkouts.length - 1;
      this.lastWeights.sq.nextWeight = this.pastWorkouts[last].exercises[0].nextWeight;
      this.lastWeights.sq.lastWeight = this.pastWorkouts[last].exercises[0].currentWeight;
      this.lastWeights.sq.date       = new Date(this.pastWorkouts[last].date);

      var count = this.pastWorkouts.length - 1;
      var i = count;

      // zipping backwards through the workouts looking for the most recent
      // of each of the exercises
      while(!this.lastWeights.bp.nextWeight && i >= 0) {
        if (this.pastWorkouts[i].exercises[1].exercise == 'bp') {
          this.lastWeights.bp.nextWeight = this.pastWorkouts[i].exercises[1].nextWeight;
          this.lastWeights.bp.lastWeight = this.pastWorkouts[i].exercises[1].currentWeight;
          this.lastWeights.bp.date       = new Date(this.pastWorkouts[i].date);
        }
        i --;
      }
      i = count;
      while(!this.lastWeights.dl.nextWeight && i >= 0) {
        if (this.pastWorkouts[i].exercises[2].exercise == 'dl') {
          this.lastWeights.dl.nextWeight = this.pastWorkouts[i].exercises[2].nextWeight;
          this.lastWeights.dl.lastWeight = this.pastWorkouts[i].exercises[2].currentWeight;
          this.lastWeights.dl.date       = new Date(this.pastWorkouts[i].date);
        }
        i --;
      }
      i = count;
      while(!this.lastWeights.sp.nextWeight && i >= 0) {
        if (this.pastWorkouts[i].exercises[1].exercise == 'sp') {
          this.lastWeights.sp.nextWeight = this.pastWorkouts[i].exercises[1].nextWeight;
          this.lastWeights.sp.lastWeight = this.pastWorkouts[i].exercises[1].currentWeight;
          this.lastWeights.sp.date       = new Date(this.pastWorkouts[i].date);
        }
        i --;
      }
      i = count;
      while(!this.lastWeights.pc.nextWeight && i >= 0) {
        if (this.pastWorkouts[i].exercises[2].exercise == 'pc') {
          this.lastWeights.pc.nextWeight = this.pastWorkouts[i].exercises[2].nextWeight;
          this.lastWeights.pc.lastWeight = this.pastWorkouts[i].exercises[2].currentWeight;
          this.lastWeights.pc.date       = new Date(this.pastWorkouts[i].date);
        }
        i --;
      }
    }
    this.lastWeights.sq.nextWeight = this.lastWeights.sq.nextWeight || 0;
    this.lastWeights.bp.nextWeight = this.lastWeights.bp.nextWeight || 0;
    this.lastWeights.dl.nextWeight = this.lastWeights.dl.nextWeight || 0;
    this.lastWeights.sp.nextWeight = this.lastWeights.sp.nextWeight || 0;
    this.lastWeights.pc.nextWeight = this.lastWeights.pc.nextWeight || 0;
    // console.log('loadData lastWeights: ' + JSON.stringify(this.lastWeights, null, 2));
  },

  saveData: function() {
    this.storeExercise.date = this.storeExercise.date.valueOf();
    console.log('saveData storeExercise: ' + JSON.stringify(this.storeExercise, null, 4));
    this.pastWorkouts.push(this.storeExercise);
    localStorage.setItem("pastWorkouts", JSON.stringify(this.pastWorkouts));
  },

  parseDate: function(date) {

    if (typeof date === 'number') {
      date = new Date(date);
    }
    var monthNames = ["January", "February", "March", "April", "May",
      "June", "July", "August", "September", "October", "November",
      "December" ];
    return monthNames[date.getMonth()] + ' ' + date.getDate() +
      ', ' + date.getFullYear();
  }

};     // end of model

var view = {

  workoutSelectView: function() {
    model.loadData();
    $('#workout').hide();
    $('#selectWorkout').show();
    $('#status').html('Workout Calc');
    $('#weightSelect').hide();
    $('#nextWeightSelect').hide();
    $('#doneWorkout').hide();
  },

  weightInputView: function() {
    // console.log('weightInputView lastWeights: ' + JSON.stringify(model.lastWeights, null, 2));

    // window.scrollTo(0, 0); //resets the view on iPhone
    $('#selectWorkout').hide();
    $('#nextWeightSelect').hide();
    $('#workout').hide();
    $('#weightSelect').show();
    $('#weightInput').focus();
    // $('#weightReps').hide();
    // $('#doneExercise').hide();
    $('#status').html(model.exerciseName(model.currentExercise));
    $('.note').html('');
    if (model.lastWeights[model.currentExercise].nextWeight > 0) {
      $('#weightInput').
        val(model.lastWeights[model.currentExercise].nextWeight);
      $('.note').text('You did ' +
          model.lastWeights[model.currentExercise].lastWeight + ' lbs. on ' +
          model.parseDate(model.lastWeights[model.currentExercise].date) + '.'
        );
    }
  },

  workoutView: function() {
    var setsTable = $('<table id="weightRepsTable"><tr><td>Sets</td><td>Weight</td><td>Reps</td></tr></table>');
    for (var i = 0; i < model.currentExerciseSets.length; i ++) {
      setsTable.append($('<tr><td>' +
        model.currentExerciseSets[i] + '</td><td>' +
        model.currentExerciseWeights[i] + '</td><td>' +
        model.currentExerciseReps[i] + '</td></tr>'));
    }
    // $('#weightReps').html(setsTable).show();
    $('#weightReps').html(setsTable);
    $('#weightInput').blur();
    $('#weightSelect').hide();
    $('#workout').show();
  },

  nextWeightSelectView: function() {
    $('#workout').hide();
    $('#nextWeightSelect').show();
    $('#nextWeightInput').val(model.workWeight);
    $('.note').text('You just did ' + model.workWeight + ' lbs.');
  },

  doneWorkoutView: function() {
    $('#nextWeightSelect').hide();
    $('#workout').hide();
    // $('#status').hide();
    $('#status').html('Warmup Calc: Done');
    $('#doneWorkout').show();

    var t = '<p>' + model.storeExercise.date.toDateString() + '</p>';
    t += "<p>Workout stored</p><br>"
    t += '<table><tr><td></td><td>Today\'s<br>Weight</td><td>Next<br>Weight</td></tr>';

    for (var i = 0; i < 3; i ++) {
      t += '<tr><td>';
      t += model.exerciseName(model.storeExercise.exercises[i].exercise);
      t += '</td><td>';
      t += model.storeExercise.exercises[i].currentWeight;
      t += '</td><td>';
      t += model.storeExercise.exercises[i].nextWeight;
      t += '</td></tr>';
    }
    t += '</table>';

    $('#displayWorkout').html($(t));
    model.saveData();

  },

  showPastWorkouts: function() {
    if (model.pastWorkouts.length == 0) {
      o = '<p>There are currently no workouts stored. Workouts are recorded in browser storage on your device, so you will need to use the same browser to access your data in the future.</p>';
    } else {
      o = '';

      for (var i = model.pastWorkouts.length-1; i >= 0; i --) {
        o += '<p><b>' + model.parseDate(model.pastWorkouts[i].date) + '</b></p><ul>';
        for (var j = 0; j < 3; j ++) {
          o += '<li><b>' + model.exerciseName(model.pastWorkouts[i].exercises[j].exercise) + ':</b> ';
          o += model.pastWorkouts[i].exercises[j].currentWeight + ' lbs. worked<br>  (';
          o += model.pastWorkouts[i].exercises[j].nextWeight + ' lbs. set for next time)</li>';
        }
        o += '</ul>';
      }


      o += '<button type="button" class="button reset-button" >Reset</button>';
    }
    $('#pastWorkouts').html($(o));

    // event handler for reset button just created

    $('.reset-button').click(function() {
      if (window.confirm("Delete all locally stored workout data?")) {
        console.log("Deleting local storage!");
        localStorage.removeItem("pastWorkouts");
        $('#pastWorkouts').html($('<p>Workouts deleted.</p>'));
      }
    });

  }

}; // end of view

var controller = {

  initializeEvents: function() {

    // prevent scrolling on mobile
    document.ontouchmove = function(e) {e.preventDefault()};

    // slide-out panels

    $('.help-button').click(function() {
      $('#help').show();
      $('#account').hide();
    });

    $('.account-button').click(function() {
      $('#account').show();
      view.showPastWorkouts();
      $('#help').hide();
    });

    $('.close-button').click(function() {
      $('#help   ').hide();
      $('#account').hide();
    });

    // workout select screen

    $('#sqBpDl').click(function() {
      model.currentWorkout = 'sqBpDl';
      model.currentExercise = 'sq';
      model.initializeStorage();
      view.weightInputView();
    });
    $('#sqSpPc').click(function() {
      model.currentWorkout = 'sqSpPc';
      model.currentExercise = 'sq';
      model.initializeStorage();
      view.weightInputView();
    });

    // weight entry screen

    $('#calculateWeightsButton').click(function() {
      var weight = $('#weightInput').val();
      if (weight > 0 && weight < 2000) {
        model.workWeight = weight;
        $('#weightInput').val(null);
        model.calculateSets();
      }
    });


    // weight display (workout) screen

    $('#doneButton').click(function() {

      if (model.currentExercise == 'done') {
        view.doneWorkoutView();
      } else {
        // view.weightInputView();
        view.nextWeightSelectView();
      }
    });

    $('#backButton').click(function() {
      $('#weightInput').val(model.workWeight);
      view.weightInputView();
    });


    // next weight select screen

    $('#nextWeightButton').click(function() {

     var weight = $('#nextWeightInput').val();
      if (weight > 0 && weight < 2000) {
        model.nextWeight = weight;
        $('#nextWeightInput').val(null);

        model.recordExercise();
        model.workWeight = 0;
        model.nextExercise();
        if (model.currentExercise == 'done') {
          view.doneWorkoutView();
        } else {
          view.weightInputView();
        }
      }

    });

    $('#backButton').click(function() {
      // override the stored weight from last time with the current set weight
      // becasue otherwise weightInputView will override model.workWeight
      // in #weightInput
      // model.lastWeights[model.currentExercise].nextWeight = model.workWeight;
      $('#weightInput').val(model.workWeight);
      console.log('backButton: ' + model.workWeight)
      view.weightInputView();
    });


    // WorkoutDone

    $('#resetButton').click(function() {
      model.currentExerciseWeights = [];

      view.workoutSelectView();

    });

    // universal

    // hitting the 'return' key will trigger whichever button has
    // the class 'default-button' that is visible
    $(window).keypress(function (event) {
      if (event.which == 13) {
        $('.default-button:visible').click();
      }
    });

    // +/- butttons sould will work on whichever is visible

    $('.inc').click(function() {
      // this could be pulled out and made a property of controller
      // but basically, we're working on whichever field is visible
      var $e = $('.weightInput:visible');
      if (!$e.val() || $e.val() == 0) {
        $e.val(45);
      } else {
        if ($e.val() < 2000) {
          // go up to the next multiple of 5:
          if ($e.val() % 5) {
            $e.val(parseInt($e.val()) + 5 - ($e.val() % 5));
          } else {
            $e.val(parseInt($e.val()) + 5);
          }
        }
      }
    });

    $('.dec').click(function() {
      var $e = $('.weightInput:visible');
      if ($e.val() > 45) {
        if ($e.val() % 5) {
          $e.val(parseInt($e.val()) - ($e.val() % 5));
        } else {
          $e.val(parseInt($e.val()) - 5);
        }
      }
    });

  } // end of initializeEvents

}; // end of controller

$(function() {

  var cordova = false;

  if (cordova) {

    FastClick.attach(document.body);

    $("#startingStrength").click(function(){
      $('body').css("background-color", "black");
      cordova.InAppBrowser.open("http://startingstrength.wikia.com/wiki/Starting_Strength_Wiki", "_system");
    });

    $("#alesh").click(function(){
      $('body').css("background-color", "black");
      cordova.InAppBrowser.open("http://alesh.com", "_system");
    });

  }

    controller.initializeEvents();
    view.workoutSelectView();


});