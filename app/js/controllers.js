var saoArenaApp = angular.module('saoArenaApp', []);


saoArenaApp.service('StateService', function() {
	this.state = "mainState";
	this.nameString = "";
	this.skillId = 99;
	this.characterId = 999;
	this.targetString = "";
	
	this.updateTargetString = function(newTargetString) {
		this.targetString = newTargetString;
	};
	
	this.updateCharacterId = function(newId) {
		this.characterId = newId;
	};
	
	this.updateSkillId = function(id) {
		this.skillId = id;
	};
	
	this.updateState = function(newState) {
		this.state = newState;
	};
	
	this.updateNameString = function(newName) {
		this.nameString = newName;
	};
	
	this.getState = function() { return this.state;};
	this.getNameString = function() {return this.nameString;};
	this.getSkillId = function() {return this.skillId;};
	this.getCharacterId = function() {return this.characterId;};
	this.getTargetString = function() {return this.targetString};
});


saoArenaApp.service('TurnService', function() {
	this.selectedCharacter = {};
	this.selectedSkills = {};
	this.usedCharacters = [];
	
	this.disableSkills = function() {
		
		for(var i=0; i<this.selectedSkills.length; i++){		
			var elem = document.getElementsByName(this.selectedSkills[i].id)[0];
			$(elem).addClass("snapshot-disabled");
		}
	};
	
	this.enableAllSkills = function(characters) {
		console.log("Enabling Skills!...");
		
		for(var i=0;i<characters.length;i++){
			
			console.log(characters[i]);
			for(var j=0; i<characters[i].skills.length; j++) {
				
				if(j>3) break;
				
				skill = characters[i].skills[j];
				console.log("Skill-> " + skill);
				console.log("Skill->id: "+skill.id);
				
				var elem = document.getElementsByName(skill.id)[0];
				$(elem).removeClass("snapshot-disabled");
			}
		}
	};
	
	this.updateSelectedChar = function(character) {
		this.selectedCharacter = character;
		this.selectedSkills = character.skills;
		console.log(this.selectedCharacter);
		console.log(this.getSelectedSkills());
	};
	
	this.getSelectedCharacter = function() {return this.selectedCharacter;};
	this.getSelectedSkills = function() {return this.selectedSkills;}
});


saoArenaApp.service('EffectService', function() {
	this.lastAddedEffects = [];
	this.activeEffects = [];
	
	this.addEffect = function(DOMElem, turnLength) {
		var effect = {
			DOM: DOMElem,
			turns: turnLength,
		};
		
		this.lastAddedEffects.push(effect);
	};
	
	this.getLastAddedEffects = function() {return this.lastAddedEffects;};
	
	this.removeLastAddedEffects = function () {
		for(var i=0; i< this.lastAddedEffects.length; i++)
		{
			$(this.lastAddedEffects[i].DOM).remove();
		}
		
		this.lastAddedEffects = [];
	};
	
	this.activateEffects = function() {
		for(var i=0; i<this.lastAddedEffects.length; i++)
		{
			this.activeEffects.push(this.lastAddedEffects[i]);
		}
		console.log("Active Effects->: " + this.activeEffects);
		this.lastAddedEffects = [];
	}
});

saoArenaApp.service('TargetService', function() {
	this.targets = [];
	
	this.targetString = "";
	
	this.updateTargets = function(targets) {
		this.targets = targets;
	};
	
	this.getTargets = function() {return this.targets;};
	
	this.updateTargetString = function(targetString) {
		this.targetString = targetString;
	};
	
	this.getTargetString = function() {return this.targetString;};
	
	this.getAvailableTargets = function(stateSrv) {
		//----------------Set Available Targets in Target Service--------------
			if(this.getTargetString() == 'self-1')
			{
				this.targets = [stateSrv.getCharacterId()];
			}
			else if(this.getTargetString() == 'self-ally-1')
			{
				this.targets = [0,1,2];
			}
			else
			{
				this.targets = [3,4,5];
			}
			//-----------(END) Set Available Targets in Target Service--------------
	}
	
	this.showAvailableTargets = function(stateSrv) {
		if(this.getTargetString() == 'self-1')
		{
			console.log("--------------self-1------------");
			
			var character = stateSrv.getCharacterId();
			
			console.log(character);
			
			var nameId = 'c-'+stateSrv.getCharacterId();
			
			var elem = document.getElementsByName(nameId)[0];
			
			$(elem).addClass('snapshot-targeted');
			
			
			var parentId = 'c-'+stateSrv.getCharacterId()+'-container';
			
			console.log(nameId);
			console.log(parentId);
			
			var parent = document.getElementsByName(parentId)[0];
			
			$(parent).addClass('snapshot-container-targeted');
			
			console.log(elem);
			console.log(parent);
			console.log("--------------------------------");

		}
		else if(this.getTargetString() == 'self-ally-1')
		{
			console.log("--------------self-ally-1------------");
			for(var i=0; i<this.targets.length; i++){	
				var nameId = 'c-'+ this.targets[i];
				var parentId = 'c-'+ this.targets[i]+'-container';
				
				console.log(nameId);
				console.log(parentId);
			
				var elem = document.getElementsByName(nameId)[0];
				var parent = document.getElementsByName(parentId)[0];
				
				console.log(elem);
				console.log(parent);
				
				$(elem).addClass("snapshot-targeted");
				$(parent).addClass("snapshot-container-targeted");
			}
			console.log("----------------------------------");
		}
		else
		{
			console.log("--------------enemy-1------------");
			for(var i=0; i<this.targets.length; i++){	
				var nameId = 'c-'+ (this.targets[i]-3);
				var parentId = 'c-'+ (this.targets[i]-3) +'-container';
				
				console.log("nameId: " + nameId);
				console.log(parentId);
			
				var elem = document.getElementsByName(nameId)[1];
				var parent = document.getElementsByName(parentId)[1];
				
				console.log(elem);
				console.log(parent);
				
				$(elem).addClass("snapshot-targeted");
				$(parent).addClass("snapshot-container-targeted");
			}
			console.log("----------------------------------");
		}
	};
	
	this.hideAvailableTargets = function() {
		for(var i=0; i<3; i++){		
			var elem = document.getElementsByName('c-'+i)[0];
			var elem2 = document.getElementsByName('c-'+i)[1];
			var parent = document.getElementsByName('c-'+i+'-container')[0];
			var parent2 = document.getElementsByName('c-'+i+'-container')[1];
			$(elem).removeClass("snapshot-targeted");
			$(elem2).removeClass("snapshot-targeted");
			$(parent).removeClass("snapshot-container-targeted");
			$(parent2).removeClass("snapshot-container-targeted");
		}
	};
});

saoArenaApp.controller('CharacterListCtrl', ['$scope', '$http', 'StateService', 'TurnService', 'EffectService', 'TargetService', 
						function ($scope, $http, StateService, TurnService, EffectService, TargetService) {

	$scope.state = StateService;
	$scope.turnSrv = TurnService;
	$scope.effectSrv = EffectService;
	$scope.targetSrv = TargetService;
	
	$scope.EndTurn = function(characters, turnSrv, effectSrv) {
		$scope.state.updateState("endTurn");
		setTimeout(function() {
			turnSrv.enableAllSkills(characters);
			effectSrv.activateEffects();
			$scope.state.updateState("mainState");
		}, 5000);
		
		
		
	};
	
	$scope.UndoSkills = function(characters, turnSrv, effectSrv, state) {
		if(state.getState() == "endTurn")
			return;
		
		turnSrv.enableAllSkills(characters);
		effectSrv.removeLastAddedEffects();
	};
	
	$http.get('app/characters/characters.json').success(function(data) {	
		$scope.characters = data;
		
		//$scope.test = characters.filter()
		
		console.log(data);
	});
	
	$http.get('app/characters/skills.json').success(function(data) {	
		$scope.skills = data;
		
		console.log(data);
	});
	
	
	$scope.selectElement = function(Id, dict, $event, state, isSkill, characters, turnSrv, effectSrv, targetSrv) {
		var element = $event.currentTarget;
		var detailImg = document.getElementById("img-detail"); 
		var detailText = document.getElementById("text-detail");
		var id = parseInt(Id);
		
		var targets = [];
		
		detailImg.src = element.src;
		
		var text = "";
		
		if(isSkill)
		{
			var text = dict[id].name;
		}
		else
		{
			var text = dict[id].description;
		}
		
			
		detailText.innerHTML = text;
		
		if(state.state == "mainState" && isSkill)
		{	
			if($(element).hasClass("snapshot-disabled"))
				return;
	
	
			$scope.state.updateState("skillSelect");
			$scope.state.updateNameString(Id);
			$scope.state.updateSkillId(id);	
			
			$(element).addClass('skill-snapshot-selected');

			var targetString = dict[id].target;
			targetSrv.updateTargetString(targetString);
			
			
			state.updateTargetString(targetString);
			state.updateCharacterId(parseInt(dict[id].character));
			
			//Update Targets Array to refelct avaiable targets 
			targetSrv.getAvailableTargets(state);
			
			//----------Reflect avaiable targets in the CSS----------
			targetSrv.showAvailableTargets(state);
			
			
			return;
		}
		else if(state.getState() == 'skillSelect')
		{
			var target = $event.currentTarget;
			
			if($(target).hasClass('skill-snapshot'))
			{
				
				//if the same skill is selected again toggle out of target selection and do not activate skill
				//if the a different skill is selected again toggle out of target selection and do not activate skill
				var elem = document.getElementsByName(state.getNameString())[0];
				$(elem).removeClass('skill-snapshot-selected');
				
				targetSrv.hideAvailableTargets();
				
				state.updateState("mainState");
				return;
			}
			else if(!$(target).hasClass('snapshot-targeted'))
			{
				//if selected target is not listed as an available/valid target return and continue with target selection
				return;
			}
			
			
			//Update Targets Array to refelct avaiable targets 
			targetSrv.getAvailableTargets(state);
			
			console.log("TargetString: " + targetSrv.getTargetString());
			//----------add activated skill to affected targets effect-rack------------
			if(targetSrv.getTargets().length < 3 || targetSrv.getTargetString() == "self-ally-1")
				var effectRack = document.getElementsByName("effect-rack-" + target.name)[0];
			else
				var effectRack = document.getElementsByName("effect-rack2-" + target.name)[0];
			
			var path = $scope.skills[state.getSkillId()].image;
			var name = $scope.skills[state.getSkillId()].name;
			
			var elem2 = document.createElement("div");
			elem2.setAttribute("name", name);
			$(elem2).addClass("tooltip-container");
			
			elem2.innerHTML = '<img class="effect-snapshot" src="' + path + '"/>';
			
			
			
			if(targetSrv.getTargets().length < 3 || targetSrv.getTargetString() == "self-ally-1")
			{
				elem2.innerHTML += '<span class="tooltiptext tooltiptextright">' + 'test' + '</span>';
				effectRack.appendChild(elem2);
			}
			else
			{
				elem2.innerHTML += '<span class="tooltiptext tooltiptextleft">' + 'test' + '</span>';
				effectRack.insertBefore(elem2, effectRack.firstChild);
			}
			
			effectSrv.addEffect(elem2, 1);
			//----------(END) add activated skill to affected targets effect-rack------------
			
			//-----------------------return all images to default CSS------------------------
			var elem = document.getElementsByName(state.getNameString())[0];
			$(elem).removeClass('skill-snapshot-selected');
			
			turnSrv.updateSelectedChar(characters[state.getCharacterId()]);
			turnSrv.disableSkills();
			
			targetSrv.hideAvailableTargets();
			//------------------(END) return all images to default CSS-----------------------
			
			
			if($scope.skills[state.getSkillId()].linked_skill)
			{
				/*var linked_id = $scope.skills[state.getSkillId()].linked_skill;
				var newSrc = $scope.skills[linked_id].image;
				
				elem.src = newSrc;
				elem.name = String(linked_id);
				
				$scope.state.updateSkillId(linked_id);
				$scope.state.updateNameString = String(linked_id);*/
				$scope.state.updateState("mainState");
			}
			else
				$scope.state.updateState("mainState");
		}

		
	};
}]);