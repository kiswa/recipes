<?php
use RedBeanPHP\R;

class Recipes extends BaseController {
    public function getAllRecipes($request, $response, $args) {
        $recipeBeans = [];

        try {
            $recipeBeans = R::findAll('recipe');
        } catch (Exception $ex) {
            $this->logger->addInfo('No recipes in database.');
            $this->apiJson->addAlert('info', 'No recipes in database.');
        }

        if (count($recipeBeans)) {
            $this->apiJson->setSuccess();

            foreach($recipeBeans as $bean) {
                $this->apiJson->addData(Recipe::fromBean($bean));
            }
        }

        return $this->jsonResponse($response);
    }

    public function getRecipe($request, $response, $args) {
        $recipe = new Recipe((int)$args['id']);

        if ($recipe->id === 0) {
            $this->logger->addError('Attempt to load recipe ' .
                $args['id'] . ' failed.');
            $this->apiJson->addAlert('error',
                'No recipe found for ID ' . $args['id'] . '.');

            return $this->jsonResponse($response);
        }

        $this->apiJson->setSuccess();
        $this->apiJson->addData($recipe);

        return $this->jsonResponse($response);
    }

    public function addRecipe($request, $response, $args) {
        $recipe = Recipe::fromJson($request->getBody());
        $recipe->save();

        if ($recipe->id === 0) {
            $this->logger->addError('Add Recipe: ', [$recipe]);
            $this->apiJson->addAlert('error', 'Error saving recipe. ' .
                'Please check your entry and try again.');

            return $this->jsonResponse($response);
        }

        $this->logger->addInfo('Add Recipe: ', [$recipe]);
        $this->apiJson->setSuccess();
        $this->apiJson->addAlert('success', 'Recipe ' .
            $recipe->name . ' saved.');

        return $this->jsonResponse($response);
    }

    public function removeRecipe($request, $response, $args) {
        $recipe = new Recipe((int)$args['id']);

        if ($recipe->id === 0) {
            $this->logger->addError('Attempt to remove recipe ' .
                $args['id'] . ' failed, recipe not found.');
            $this->apiJson->addAlert('error',
                'No recipe found for ID ' . $args['id'] . ' so cannot delete.');

            return $this->jsonResponse($response);
        }

        $recipe->delete();

        $this->logger->addInfo('Remove Recipe: ', [$recipe]);
        $this->apiJson->setSuccess();
        $this->apiJson->addAlert('success', 'Recipe ' .
            $recipe->name . ' deleted.');

        return $this->jsonResponse($response);
    }

    public function updateRecipe($request, $response, $args) {
        $recipe = new Recipe((int)$args['id']);

        if ($recipe->id === 0) {
            $this->logger->addError('Attempt to update recipe ' .
                $args['id'] . ' failed, recipe not found.');
            $this->apiJson->addAlert('error',
                'No recipe found for ID ' . $args['id'] . ' so cannot update.');

            return $this->jsonResponse($response);
        }

        $update = Recipe::fromJson($request->getBody());
        $recipe->copyFrom($update);
        $recipe->save();

        $this->logger->addInfo('Update Recipe: ', [$recipe]);
        $this->apiJson->setSuccess();
        $this->apiJson->addAlert('success', 'Recipe ' .
            $recipe->name . ' updated.');

        return $this->jsonResponse($response);
    }
}
