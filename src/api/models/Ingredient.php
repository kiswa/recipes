<?php
class Ingredient extends BaseModel {
    public $id = 0;
    public $name = '';
    public $amount = 0;
    public $measure = '';

    public function __construct($id = 0) {
        parent::__construct('ingredient', $id);

        $this->loadFromBean($this->bean);
    }

    public function updateBean() {
        $bean = &$this->bean;

        $bean->id = $this->id;
        $bean->name = $this->name;
        $bean->amount = $this->amount;
        $bean->measure = $this->measure;
    }

    public function loadFromBean($bean) {
        $this->id = $bean->id;
        $this->name = $bean->name;
        $this->amount = $bean->amount;
        $this->measure = $bean->measure;
    }
}
