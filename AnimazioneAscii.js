/* SCRIPT ANIMAZIONE ASCII */




		import { run } from 'play.core-master/src/run.js'
		import * as program from 'play.core-master/src/programs/demos/chromaspiral.js'
		run(program, { element : document.querySelector('ascii-animation') })
    .then(function(e){
			console.log(e)
		})
    .catch(function(e) {
			console.warn(e.message)
			console.log(e.error)
		})

