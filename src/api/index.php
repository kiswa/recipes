<?php
require './vendor/autoload.php';

use RedBeanPHP\R;
R::setup('sqlite:recipes.db');

$app = new Slim\App();
require 'app-setup.php';

$app->get('/', 'Invalid:noApi');

$app->get ('/recipes', 'Recipes:getAllRecipes');
$app->post('/recipes', 'Recipes:addRecipe');

$app->get   ('/recipes/{id}', 'Recipes:getRecipe');
$app->post  ('/recipes/{id}', 'Recipes:updateRecipe');
$app->delete('/recipes/{id}', 'Recipes:removeRecipe');

$app->run();
R::close();
