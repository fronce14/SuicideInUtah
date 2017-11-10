read.csv("suicidebyrace2.csv")
library(tidyverse)
data("suicidebyrace2.csv")
suiciderace <- read.csv("suicidebyrace2.csv")


ggplot(data = suiciderace, aes(x = Race, y = Suicide.Rate, fill = Race)) +
  geom_bar(stat = "identity") +
  guides(fill = FALSE) +
  scale_fill_manual(values = c("grey","red3","grey","grey","grey","grey")) +
  theme(panel.grid.major = element_blank(), panel.grid.minor = element_blank(),
        panel.background = element_blank()) +
  ggtitle("Suicide Rates In Utah By Race (Per 100,000 Individuals)") +
  xlab("") + ylab("")
