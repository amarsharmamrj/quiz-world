$(document).ready(function() {
    $(".play-button").click(function() {
        $(".quiz-modal-box").removeClass("hidden");
        $(".quiz-modal-box").addClass("show");
        $(".quiz-modal-box").html('<button type="button" class="close">&#10005;</button>' + '<div class="loader-div">' +
            '<div class="loader">' +
            '  <span class="l-span">L</span>' +
            '  <span class="l-span">O</span>' +
            '  <span class="l-span">A</span>' +
            '  <span class="l-span">D</span>' +
            '  <span class="l-span">I</span>' +
            '  <span class="l-span">N</span>' +
            '  <span class="l-span">G</span>' +
            '  ' +
            '  <div class="covers">' +
            '    <span class="l-span"></span>' +
            '    <span class="l-span"></span>' +
            '    <span class="l-span"></span>' +
            '    <span class="l-span"></span>' +
            '    <span class="l-span"></span>' +
            '    <span class="l-span"></span>' +
            '    <span class="l-span"></span>' +
            '  </div>' +
            '</div>' +
            '</div>');
        $(".close").click(function() {
            $(".quiz-modal-box").addClass("hidden");
        });

        $.ajax({
            url: "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple",
            dataType: "json",
            method: "GET",
            success: function(data) {
                console.log(data);
                $(".quiz-modal-box").html('<button type="button" class="close">&#10005;</button>' + '<p class="time-counter">9</p>' +
                    '                            <p class="question-number"><span></span>/10</p>' +
                    '                            <p class="question"></p>' +
                    '                            <div class="question-options">' +
                    '                                <ul>' +
                    '                                    <li>' +
                    '                                        <button button class="option1"></button>' +
                    '                                    </li>' +
                    '                                    <li>' +
                    '                                        <button type="button" class="option2"></button>' +
                    '                                    </li>' +
                    '                                    <li>' +
                    '                                        <button type="button" class="option3"></button>' +
                    '                                    </li>' +
                    '                                    <li>' +
                    '                                        <button type="button" class="option4"></button>' +
                    '                                    </li>' +
                    '                                </ul>' +
                    '                            </div>');
                $(".close").click(function() {
                    $(".quiz-modal-box").addClass("hidden");
                });

                // passing json values for the first question
                $(".question-number span").text(1);
                $(".question").text(data.results[0].question);
                $(".option1").text(data.results[0].correct_answer);
                $(".option2").text(data.results[0].incorrect_answers[0]);
                $(".option3").text(data.results[0].incorrect_answers[1]);
                $(".option4").text(data.results[0].incorrect_answers[2]);


                // counter for first question 
                var counter = 9;
                setInterval(function() {
                    if (counter >= 0) {
                        $(".time-counter").text(counter);
                        counter--;
                    }
                }, 1000);

                // passing json values for the 2-10 questions
                // getting values clicked options
                var responces = [];
                var value = "";
                $("ul li button").click(function() {
                    value = $(this).text();
                    // array
                    responces.push(value);
                    $("ul li button").attr("disabled", true);
                });

                var index = 1;
                setInterval(function() {
                    if (index < 10) {
                        if (responces.length < index) {
                            responces.push("n");
                        }
                        $(".question-number span").text(index + 1);
                        $(".question").text(data.results[index].question);
                        $(".option1").text(data.results[index].correct_answer);
                        $(".option2").text(data.results[index].incorrect_answers[0]);
                        $(".option3").text(data.results[index].incorrect_answers[1]);
                        $(".option4").text(data.results[index].incorrect_answers[2]);
                        index++;
                        $("ul li button").attr("disabled", false);

                        if (index === 10) {
                            var counter = 9;
                            setInterval(function() {
                                if (counter >= 0) {
                                    $(".time-counter").text(counter);
                                    counter--;
                                    if (counter === 0) {
                                        if (responces.length < index) {
                                            responces.push("n");
                                        }

                                        // calculation of pointer
                                        var pointer = 0;
                                        for (i = 0; i < 10; i++) {
                                            if (responces[i] === data.results[i].correct_answer) {
                                                pointer = pointer + 1;
                                            } else {
                                                pointer = pointer;
                                            }
                                        }

                                        // calculation of number of attempted and unattempted questions
                                        var index_of_unattempted = [];
                                        var unattempted;
                                        var attempted;
                                        for (i = 0; i < 10; i++) {
                                            if (responces[i] === "n") {
                                                index_of_unattempted.push(i);
                                                unattempted = index_of_unattempted.length;
                                                attempted = 10 - unattempted;
                                            }
                                        }

                                        //result board
                                        $(".quiz-modal-box").html('<button class="close">&#10005;</button>' + '<div class="result-box">' +
                                            '                                <p class="score-heading">Score</p>' +
                                            '                                <hr>' +
                                            '                                <p class="score-value"><span class="score">' + pointer + '</span><span class="score-out-of">/10</span></p>' +
                                            '                                <p class="attempted"><span>Attempted:</span><span class="attempted-value"> ' + attempted + '</span></p>' +
                                            '                                <p class="unattempted"><span>Unattempted:</span ><span class="unattempted-value"> ' + unattempted + '</span class="unattempted-value"></p>' +
                                            '                                <img class="result-image" src="assets/images/result.gif" alt="">' +
                                            '                                <div class="review-button-div">' +
                                            '                                    <button class="btn btn-primary review-button">' +
                                            '                                        <span class="spinner-grow spinner-grow-sm"></span> Review Questions' +
                                            '                                    </button>' +
                                            '                            </div>');
                                        $(".close").click(function() {
                                            $(".quiz-modal-box").addClass("hidden");
                                        });

                                        $(".review-button").click(function() {
                                            $(".quiz-modal-box").html('<button class="close">&#10005;</button>' + '<div class="summary">Summary</div>');
                                            // summary page population of each questions
                                            for (i = 0; i < 10; i++) {
                                                var number = i + 1;
                                                $(".summary").append('<div class="question-container">' +
                                                    '                            <div class="number">' +
                                                    '                                <p>Question No: ' + number + '</p>' +
                                                    '                                <hr class="summary-hr">' +
                                                    '                            </div>' +
                                                    '                            <div class="questions">' +
                                                    '                                <p>' + data.results[i].question + '</p>' +
                                                    '                            </div>' +
                                                    '                            <div class="panel-group">' +
                                                    '                                <div class="panel panel-default">' +
                                                    '                                    <div class="panel-heading">' +
                                                    '                                        <h4 class="panel-title">' +
                                                    '                                            <a data-toggle="collapse" href="#collapse' + i + '">Show Answer</a>' +
                                                    '                                        </h4>' +
                                                    '                                    </div>' +
                                                    '                                    <div id="collapse' + i + '" class="panel-collapse collapse">' +
                                                    '                                        <div class="panel-body">' + data.results[i].correct_answer + '</div>' +
                                                    '                                    </div>' +
                                                    '                                </div>' +
                                                    '                            </div>' +
                                                    '                        </div>');

                                                $(".close").click(function() {
                                                    $(".quiz-modal-box").addClass("hidden");
                                                });
                                            }
                                            // summary page population of each questions
                                        });
                                    }
                                }
                            }, 1000);
                        }

                        // counter for 2-10 questions
                        var counter = 9;
                        setInterval(function() {
                            if (counter >= 0) {
                                $(".time-counter").text(counter);
                                counter--;
                            }
                        }, 1000);
                    }
                }, 10000);
            },
            error: function() {

            }
        });
    });
});
