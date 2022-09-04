package com.zipedoc.service;

import com.zipedoc.domain.Document;
import com.zipedoc.domain.SharedUser;
import com.zipedoc.domain.User;
import com.zipedoc.repository.DocumentRepository;
import com.zipedoc.repository.SharedUserRepository;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.print.Doc;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DocumentService {

    private final Logger log = LoggerFactory.getLogger(DocumentService.class);

    private final DocumentRepository documentRepository;

    private final UserService userService;

    private final SharedUserRepository sharedUserRepository;

    public DocumentService(DocumentRepository documentRepository, UserService userService, SharedUserRepository sharedUserRepository) {
        this.documentRepository = documentRepository;
        this.userService = userService;
        this.sharedUserRepository = sharedUserRepository;
    }

    public Document addUserAssociationPostDocument(Document document) {
        User user = userService.getUserWithAuthorities().orElseGet(User::new);
        document.setUserName(user);
        document.sets3key("zipedoc/" + user.getLogin() + "/" + document.getDocumentTitle() + ".txt");
        return documentRepository.save(document);
    }

    // originally returned documents that the logged in user owns
    // appended method to return documents that the logged in user owns and has read only access
    // could be refactored into multiple methods to separate read and read/write access
    public List<Document> sortDocumentsByModifiedDateMostRecentFirst() {
        User user = userService.getUserWithAuthorities().orElseGet(User::new);
        Set<Document> documentSet = new HashSet<>(documentRepository.findByUserNameIsCurrentUser());
        List<SharedUser> sharedUserList = sharedUserRepository.findAll();
        for (SharedUser sharedUser : sharedUserList) {
            if (sharedUser.getUserName().equals(user.getLogin())) {
                documentSet.add(sharedUser.getTitle());
            }
        }
        List<Document> documentList = new ArrayList<>(documentSet);
        Collections.sort(documentList);
        return documentList;
    }
}
