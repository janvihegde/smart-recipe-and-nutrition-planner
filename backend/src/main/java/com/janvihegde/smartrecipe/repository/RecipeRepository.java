package com.janvihegde.smartrecipe.repository;

import com.janvihegde.smartrecipe.model.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe,String> {

}
