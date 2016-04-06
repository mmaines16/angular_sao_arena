var saoArenaApp = angular.module('saoArenaApp', []);


saoArenaApp.service('StateService', function() {
	this.state = "mainState";
	this.nameString = "";
	this.skillId = 99;
	this.characterId = -1;
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

saoArenaApp.controller('CharacterListCtrl', ['$scope', '$http', 'StateService', function ($scope, $http, StateService) {

	$scope.state = StateService;
	
	$scope.EndTurn = function() {
		$scope.state.updateState("endTurn");
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
	
	
	$scope.selectElement = function(Id, dict, $event, state, isSkill, characters, charService) {
		var element = $event.currentTarget;
		var detailImg = document.getElementById("img-detail"); 
		var detailText = document.getElementById("text-detail");
		var id = parseInt(Id);
		
		var targets = [];
		
		detailImg.src = element.src;
			
		var text = dict[id].name;
			
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
			
			state.updateTargetString(targetString);
			state.updateCharacterId(parseInt(dict[id].character));
			
			
			return;
		}
		else if(state.getState() == 'skillSelect')
		{
			var target = $event.currentTarget;
			
			if(state.getTargetString() == 'self-1' || state.getTargetString() == 'self-ally-1')
				targets = [state.getCharacterId()];
			else
				targets = [3,4,5];
			
			if(targets.length < 3)
				var effectRack = document.getElementsByName("effect-rack-" + target.name)[0];
			else
				var effectRack = document.getElementsByName("effect-rack2-" + target.name)[0];
			
			var path = $scope.skills[state.getSkillId()].image;
			
			
			var elem2 = document.createElement("div");
			//elem2.setAttribute("", "");
			$(elem2).addClass("tooltip-container");
			
			elem2.innerHTML = '<img class="effect-snapshot" src="' + path + '"/>';
			elem2.innerHTML += '<span class="tooltiptext">' + 'test' + '</span>';
			
			
			if(targets.length < 3)
			{
				effectRack.appendChild(elem2);
			}
			else
			{
				effectRack.insertBefore(elem2, effectRack.firstChild);
			}
			
			
			var elem = document.getElementsByName(state.getNameString())[0];
			$(elem).removeClass('skill-snapshot-selected');
			
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