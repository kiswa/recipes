<?php
class Recipe extends BaseModel {
    public $id = 0;
    public $name = '';
    public $category = '';
    public $prepTime = 0;
    public $cookTime = 0;
    public $ingredients = [];
    public $imageData = '';
    public $directions = '';
    public $description = '';

    public function __construct($id = 0, $internal = false) {
        parent::__construct('recipe', $id);
        if ($internal) {
            return;
        }

        $this->loadFromBean($this->bean);
    }

    public static function fromBean($bean) {
        $instance = new self(0, true);
        $instance->loadFromBean($bean);

        return $instance;
    }

    public static function fromJson($json) {
        $instance = new self(0, true);
        $instance->loadFromJson($json);

        return $instance;
    }

    public function updateBean() {
        $bean = &$this->bean;

        $bean->name = $this->name;
        $bean->category = $this->category;
        $bean->prepTime = $this->prepTime;
        $bean->cookTime = $this->cookTime;
        $bean->imageData = $this->imageData;
        $bean->directions = $this->directions;
        $bean->description = $this->description;
        $bean->xownIngredientList = [];

        foreach ($this->ingredients as $ingredient) {
            $ingredient->updateBean();
            $bean->xownIngredientList[] = $ingredient->bean;
        }
    }

    public function loadFromBean($bean) {
        $this->loadObject($bean);

        foreach ($bean->xownIngredientList as $ingredient) {
            $this->ingredients[] = new Ingredient($ingredient->id);
        }
    }

    public function copyFrom($recipe) {
        $this->loadObject($recipe);

        $this->ingredients = [];
        $this->loadIngredients($recipe);
    }

    private function loadFromJson($json) {
        $recipe = json_decode($json);
        $this->loadObject($recipe);
        $this->loadIngredients($recipe);
    }

    private function loadIngredients($recipe) {
        foreach($recipe->ingredients as $ingredient) {
            $newIng = new Ingredient();

            $newIng->name = $ingredient->name;
            $newIng->amount = $ingredient->amount;
            $newIng->measure = $ingredient->measure;

            $this->ingredients[] = $newIng;
        }
    }

    private function loadObject($obj) {
        $this->id = $obj->id;
        $this->name = $obj->name;
        $this->category = $obj->category;
        $this->prepTime = $obj->prepTime;
        $this->cookTime = $obj->cookTime;
        $this->imageData = $obj->imageData;
        $this->directions = $obj->directions;
        $this->description = $obj->description;
    }
}
