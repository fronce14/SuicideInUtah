read.csv("suicidebyage2.csv")
library(tidyverse)
data("suicidebyage2.csv")
suicideage <- read.csv("suicidebyage2.csv")

ggplot(data = suicideage, aes(x = Sex, y = Suicide.Rate)) +
  geom_col() +
  facet_wrap(~Age.Group,
             nrow = 2) +
  labs(title = "Suicide Rates In Utah by Age Group (Per 100,000 Individuals)",
       x = "",
       y = "") +
  theme_minimal() +
  theme(panel.grid = element_blank())
