.populate("categories", "-__v -_id -subCategories -parentCategory")
.populate("author", "-__v")
.populate("subCategories", "-__v -_id -subCategories -parentCategory")
.populate("parentCategory", "-__v -_id -subCategories -parentCategory")
.select("-__v");